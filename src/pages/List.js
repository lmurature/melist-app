import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import RestUtils from "../utils/RestUtils";
import { Container, Spinner, Tabs, Tab } from "react-bootstrap";
import Items from "../components/Items";
import Search from "../components/Search";
import Share from "../components/Share";
import Config from "../components/Config";
import PrivacyLabel from "../components/PrivacyLabel";
import axios from "axios";
import "./styles/List.scss";
import { Star, StarFill } from "react-bootstrap-icons";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const List = () => {
  const { listId } = useParams();

  let query = useQuery();
  let history = useHistory();

  const getContextOrDefault = (defaultValue) => {
    return query.get("tab") == null ? defaultValue : query.get("tab");
  };

  const [list, setList] = useState({ privacy: null });
  const [listItems, setListItems] = useState([]);
  const [listIsFaved, setListIsFaved] = useState(false);
  const [showFavIcon, setShowFavIcon] = useState(true);

  const [tab, setTab] = useState(getContextOrDefault("items"));

  const [listPermissions, setListPermissions] = useState({});

  const reloadItems = () => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/items?info=true`,
        RestUtils.getHeaders()
      )
      .then((response) => setListItems(response.data))
      .catch((err) => console.log(err));
  };

  const shouldBeDisabled = (tabKey) => {
    if (listPermissions.share_type === "admin") {
      return false;
    }
    if (tabKey === "search") {
      if (listPermissions.share_type === "write") {
        return false;
      }
    }

    return true;
  };

  const handleChangeTab = (tab) => {
    if (tab === "items") {
      reloadItems();
    }
    setTab(tab);
  };

  const handleFavClick = () => {
    setShowFavIcon(false);
    if (listIsFaved) {
      axios
        .delete(
          `${RestUtils.getApiUrl()}/api/lists/favorite/${listId}`,
          RestUtils.getHeaders()
        )
        .then((response) => {
          setListIsFaved(false);
          setShowFavIcon(true);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(
          `${RestUtils.getApiUrl()}/api/lists/favorite/${listId}`,
          null,
          RestUtils.getHeaders()
        )
        .then((response) => {
          setListIsFaved(true);
          setShowFavIcon(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const getFavouriteIcon = () => {
    return (
      showFavIcon && (
        <button onClick={handleFavClick}>
          {listIsFaved ? <StarFill /> : <Star />}
        </button>
      )
    );
  };

  useEffect(() => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}`,
        RestUtils.getHeaders()
      )
      .then((response) => setList(response.data))
      .catch((err) => console.log(err));

    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/items?info=true`,
        RestUtils.getHeaders()
      )
      .then((response) => setListItems(response.data))
      .catch((err) => console.log(err));

    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}/permissions`,
        RestUtils.getHeaders()
      )
      .then((response) => setListPermissions(response.data))
      .catch((err) => console.log(err));

    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/favorites`,
        RestUtils.getHeaders()
      )
      .then((response) =>
        response.data.forEach((list) => {
          if (list.id == listId) {
            setListIsFaved(true);
          }
        })
      )
      .catch((err) => console.log(err));
  }, [listId]);

  return (
    <Container>
      <div className="list-title">
        {list === null ? (
          <Spinner animation="border" role="status" />
        ) : (
          <h2 className="list-heading">
            {list.title} <span className="fav-icon">{getFavouriteIcon()}</span>
            <PrivacyLabel privacy={list.privacy} />
          </h2>
        )}
      </div>
      <Tabs
        activeKey={tab}
        onSelect={(k) => {
          history.push(`/lists/${listId}?tab=${k}`);
          if (k === "items") {
            reloadItems();
          }
          setTab(k);
        }}
      >
        <Tab key="items" eventKey="items" title="Productos">
          <Items items={listItems} />
        </Tab>
        <Tab
          key="search"
          eventKey="search"
          title="Búsqueda"
          disabled={shouldBeDisabled("search")}
        >
          <Search changeTab={handleChangeTab} listId={listId} />
        </Tab>
        <Tab
          key="share"
          eventKey="share"
          title="Compartir"
          disabled={shouldBeDisabled("share")}
        >
          <Share listId={listId} ownerId={list.owner_id} />
        </Tab>
        <Tab
          key="config"
          eventKey="configuration"
          title="Ajustes"
          disabled={shouldBeDisabled("config")}
        >
          <Config
            listId={listId}
            title={list.title}
            description={list.description}
            privacy={list.privacy}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default List;

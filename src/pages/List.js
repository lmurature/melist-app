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
    setTab(tab);
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
  }, [listId]);

  return (
    <Container>
      <div className="list-title">
        {list === null ? (
          <Spinner animation="border" role="status" />
        ) : (
          <h2 className="list-heading">
            {list.title}
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

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
import "./styles/List.css";

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
          setTab(k);
        }}
      >
        <Tab key="items" eventKey="items" title="Artículos">
          <Items items={listItems} />
        </Tab>
        <Tab key="search" eventKey="search" title="Búsqueda">
          <Search />
        </Tab>
        <Tab key="share" eventKey="share" title="Compartir">
          <Share />
        </Tab>
        <Tab key="config" eventKey="configuration" title="Ajustes">
          <Config />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default List;

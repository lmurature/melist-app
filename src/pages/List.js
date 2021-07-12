import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestUtils from "../utils/RestUtils";
import { Container, Spinner, Tabs, Tab } from "react-bootstrap";
import Items from "../components/Items";
import Search from "../components/Search";
import Share from "../components/Share";
import Config from "../components/Config";
import PrivacyLabel from "../components/PrivacyLabel";
import axios from "axios";
import "./styles/List.css";

const List = () => {
  const { listId } = useParams();

  const [list, setList] = useState({ privacy: null });
  const [listItems, setListItems] = useState([]);

  const [tab, setTab] = useState("items");

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
      <Tabs activeKey={tab} onSelect={(k) => setTab(k)}>
        <Tab eventKey="items" title="Artículos">
          <Items items={listItems} />
        </Tab>
        <Tab eventKey="search" title="Búsqueda">
          <Search />
        </Tab>
        <Tab eventKey="share" title="Compartir">
          <Share />
        </Tab>
        <Tab eventKey="configuration" title="Ajustes">
          <Config />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default List;

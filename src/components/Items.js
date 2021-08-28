import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmptyItemsState from "./EmptyItemsState";
import ItemCard from "./ItemCard";
import axios from "axios";
import RestUtils from "../utils/RestUtils";
import "./styles/Items.scss";

const Items = (props) => {
  const { listId, shareType, notifications } = props;

  const [listItems, setListItems] = useState([]);

  const handleCheck = (itemId, isCheck) => {
    axios
      .put(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/${
          isCheck ? "check" : "uncheck"
        }/${itemId}`,
        null,
        RestUtils.getHeaders()
      )
      .then((response) => setListItems(response.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (itemId) => {
    axios
      .delete(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/items/${itemId}`,
        RestUtils.getHeaders()
      )
      .then((response) => setListItems(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setListItems(props.items);
  }, [props]);

  return (
    <div className="list-items">
      <div className="list-items-heading">
        <h3 className="list-items-heading-title">Productos en la Lista</h3>
      </div>
      <Container>
        {listItems.length > 0 ? (
          <Row>
            {listItems.map((listItem) => {
              return (
                <Col
                  className="animate__animated animate__fadeIn"
                  key={listItem.item.id}
                  lg={2}
                  md={3}
                  xl={2}
                  xs={4}
                  xxl={2}
                >
                  <ItemCard
                    key={listItem.item.id}
                    id={listItem.item.id}
                    pictures={listItem.item.pictures}
                    title={listItem.item.title}
                    description={listItem.item.description}
                    price={listItem.item.price}
                    stock={listItem.item.vailable_quantity}
                    permalink={listItem.item.permalink}
                    itemListStatus={listItem.status}
                    listId={listItem.list_id}
                    thumbnail={listItem.item.thumbnail}
                    itemStatus={listItem.item.status}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                    shareType={shareType}
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <EmptyItemsState />
        )}
      </Container>
    </div>
  );
};

export default Items;

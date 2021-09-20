import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmptyItemsState from "./EmptyItemsState";
import ItemCard from "./ItemCard";
import axios from "axios";
import RestUtils from "../utils/RestUtils";
import "./styles/Items.scss";
import ListsService from "../services/ListsService";

const Items = (props) => {
  const { listId, shareType, notifications } = props;

  const [listItems, setListItems] = useState([]);
  const [readyToRequest, setReadyToRequest] = useState(true);
  const [apiError, setApiError] = useState(null); // TODO: manage

  const handleCheck = async (itemId, isCheck) => {
    setReadyToRequest(false);

    try {
      const listResult = await ListsService.setItemListStatus(
        listId,
        itemId,
        isCheck
      );
      setListItems(listResult);
    } catch (err) {
      setApiError(err);
    }

    setReadyToRequest(true);
  };

  const handleDelete = async (itemId) => {
    try {
      const listResult = await ListsService.deleteItemFromList(listId, itemId);
      setListItems(listResult);
    } catch (err) {
      setApiError(err);
    }
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
                    readyToRequest={readyToRequest}
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

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import EmptyItemsState from "./EmptyItemsState";
import ItemCard from "./ItemCard";
import "./styles/Items.scss";
import ListsService from "../services/ListsService";

const Items = (props) => {
  const { listId, shareType, notifications, itemsError } = props;

  const [listItems, setListItems] = useState([]);
  const [readyToRequest, setReadyToRequest] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

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
        <Alert show={apiError} variant="danger">
          Hubo un error al ejecutar la acción en el servidor.
        </Alert>
        <Alert show={itemsError} variant="danger">
          Hubo un error al buscar los productos de la lista.
        </Alert>
        {listItems ? (
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
          !itemsError && <EmptyItemsState />
        )}
      </Container>
    </div>
  );
};

export default Items;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, ListGroup } from 'react-bootstrap';
import EmptyItemsState from './EmptyItemsState';
import ItemCard from './ItemCard';
import './styles/Items.scss';
import ListsService from '../services/ListsService';
import NumberFormat from 'react-number-format';

const Items = (props) => {
  const { listId, shareType, notifications, itemsError, qtyOfItems } = props;

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

  const getListItemsTitle = () => {
    return listItems.length > 0
      ? `${listItems.length} productos en la lista`
      : '';
  };

  const getItemsTotalPrice = () => {
    let totalPrice = 0;
    listItems.forEach((i) => {
      totalPrice += i.item.price;
    });
    return totalPrice;
  };

  const getCheckedItems = () => {
    return listItems.filter((i) => i.status === 'checked').length;
  };

  const getCheckedItemsPrice = () => {
    let checkedPrice = 0;
    listItems
      .filter((i) => i.status === 'checked')
      .forEach((c) => {
        checkedPrice += c.item.price;
      });
    return checkedPrice;
  };

  const getRemainingPrice = () => {
    return getItemsTotalPrice() - getCheckedItemsPrice();
  };

  const getNotAvailableItems = () => {
    return listItems.filter((i) => i.item.status !== 'active').length;
  };

  useEffect(() => {
    setListItems(props.items);
  }, [props]);

  return (
    <div className="list-items">
      <div className="list-items-heading">
        <h3 className="list-items-heading-title">{getListItemsTitle()}</h3>
      </div>
      <Container>
        <Alert show={apiError} variant="danger">
          Hubo un error al ejecutar la acción en el servidor.
        </Alert>
        <Alert show={itemsError} variant="danger">
          Hubo un error al buscar los productos de la lista.
        </Alert>
        <div className="list-items-summary">
          <ListGroup>
            <ListGroup.Item>
              Precio total:
              <div className="list-items-summary-values">
                <span className="item-data-price">
                  <NumberFormat
                    value={getItemsTotalPrice()}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'$'}
                    decimalScale={2}
                  />
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              Productos comprados:{' '}
              <div className="list-items-summary-values">
                <span className="item-data-negative-price">
                  <NumberFormat
                    value={getCheckedItemsPrice()}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'$'}
                    decimalScale={2}
                  />
                </span>{' '}
                ({getCheckedItems()})
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              Restante:{' '}
              <div className="list-items-summary-values">
                <span className="item-data-price">
                  <NumberFormat
                    value={getRemainingPrice()}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'$'}
                    decimalScale={2}
                  />
                </span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              Productos no disponibles:{' '}
              <div className="list-items-summary-values">
                {getNotAvailableItems()}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
        {listItems && listItems.length > 0 ? (
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

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmptyItemsState from "./EmptyItemsState";
import ItemCard from "./ItemCard";
import "./styles/Items.css";

const Items = (props) => {
  const listItems = props.items;

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
                <Col key={listItem.item.id} lg={2} md={3} xl={2} xs={4} xxl={2}>
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

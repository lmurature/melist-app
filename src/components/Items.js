import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
        <Row>
          {listItems.map((listItem) => {
            return (
              <Col lg={2} md={3} xl={2} xs={6} xxl={2}>
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
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Items;

import React from "react";
import { Container, Button, Col, Row, Carousel, Table } from "react-bootstrap";
import NumberFormat from "react-number-format";
import "./styles/ItemSearchModal.css";

const ItemSearchModal = (props) => {
  const { data } = props;

  return data !== null && data !== undefined ? (
    <Container>
      {console.log(data)}
      <Row>
        <Col lg={6} md={6} xl={6} xs={6} xxl={6}>
          <Carousel className="item-img-carousel" variant="dark">
            {data.pictures.map((picture) => {
              return (
                <Carousel.Item key={picture.id}>
                  <div className="item-img-div">
                    <img className="item-img" src={picture.url} />
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col lg={6} md={6} xl={6} xs={6} xxl={6}>
          <Container>
            <div className="price-stock-seller">
              <span className="item-data-price-modal">
                <NumberFormat
                  value={data.price}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"$"}
                />
              </span>
              <div>{data.available_quantity + " "} unidades disponibles</div>
              <div>{data.sold_quantity + " "} unidades vendidas</div>
            </div>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6} xl={6} xs={6} xxl={6}>
          <Container>
            <div className="attribute-table">
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Atributo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {data.attributes.map((attribute) => {
                    return (
                      <tr>
                        <td>{attribute.name}</td>
                        <td>{attribute.value_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Container>
        </Col>
        <Col lg={6} md={6} xl={6} xs={6} xxl={6}>
          <Container>
            <div className="item-description">{data.description}</div>
          </Container>
          <Container className="modal-buttons">
            <Button
              variant="primary"
              className="meli-permalink-button"
              size="lg"
              href={data.permalink}
              target="_blank"
            >
              <div className="button-msg">Ver en Mercado Libre</div>
            </Button>
          </Container>
        </Col>
      </Row>
    </Container>
  ) : (
    ""
  );
};

export default ItemSearchModal;

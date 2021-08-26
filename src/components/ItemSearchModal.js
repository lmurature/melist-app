import React from "react";
import { Container, Col, Row, Carousel, Table } from "react-bootstrap";
import Arrow from "../assets/arrow.png";
import ItemDescription from "./ItemDescription";
import LinkToMeli from "./LinkToMeli";
import PriceStock from "./PriceStock";
import "./styles/ItemSearchModal.scss";

const ItemSearchModal = (props) => {
  const { data } = props;

  return data !== null && data !== undefined ? (
    <Container>
      {console.log(data)}
      <Row>
        <Col lg={6} md={6} xl={6} xs={6} xxl={6}>
          <Carousel
            className="item-img-carousel"
            variant="dark"
            nextIcon={<img className="icon" src={Arrow} alt="next" />}
            prevIcon={<img className="icon icon-prev" src={Arrow} alt="prev" />}
          >
            {data.pictures.map((picture) => {
              return (
                <Carousel.Item key={picture.id}>
                  <div className="item-img-div">
                    <img
                      className="item-img"
                      alt={data.title}
                      src={picture.url}
                    />
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col lg={6} md={6} xl={6} xs={6} xxl={6}>
          <Container>
            <PriceStock
              aQuantity={data.available_quantity}
              sQuantity={data.sold_quantity}
              price={data.price}
            />
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
                      <tr key={attribute.id}>
                        <span className="attribute-name">{attribute.name}</span>{" "}
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
            <ItemDescription description={data.description} />
          </Container>
          <Container className="modal-buttons">
            <LinkToMeli permalink={data.permalink} />
          </Container>
        </Col>
      </Row>
    </Container>
  ) : (
    ""
  );
};

export default ItemSearchModal;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Table, Alert } from "react-bootstrap";
import { useParams } from "react-router";
import NumberFormat from "react-number-format";
import "./styles/ViewItemPage.scss";
import RestUtils from "../utils/RestUtils";
import Arrow from "../assets/arrow.png";
import LinkToMeli from "../components/LinkToMeli";
import ItemDescription from "../components/ItemDescription";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import "moment/locale/es";
import moment from "moment";

const ViewItemPage = () => {
  const { listId, itemId } = useParams();

  const [itemData, setItemData] = useState(null);

  const [itemHistory, setItemHistory] = useState(null);

  const [categoryTrends, setCategoryTrends] = useState(null);

  const [listItemStatus, setListItemStatus] = useState(null);

  const fetchCategoryTrends = () => {
    if (itemData)
      axios
        .get(
          `${RestUtils.getApiUrl()}/api/items/trends/${itemData.category_id}`,
          RestUtils.getHeaders()
        )
        .then((response) => setCategoryTrends(response.data))
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/items/${itemId}`,
        RestUtils.getHeaders()
      )
      .then((response) => setItemData(response.data))
      .catch((err) => console.log(err));

    axios
      .get(
        `${RestUtils.getApiUrl()}/api/items/${itemId}/history`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let date = response.data[i].date_fetched;
          response.data[i].date_fetched = moment(date)
            .locale("es")
            .subtract(3, "hours")
            .fromNow();
        }

        setItemHistory(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/status/${itemId}`,
        RestUtils.getHeaders()
      )
      .then((response) => setListItemStatus(response.data))
      .catch((err) => console.log(err));
  }, [itemId]);

  useEffect(() => {
    fetchCategoryTrends();
  }, [itemData]);

  return (
    itemData !== null && (
      <div className="view-item-page">
        <Container>
          <Link to={`/lists/${listId}`}>
            <ArrowLeft /> Atrás
          </Link>
          <div className="vip-title-box">
            <span className="vip-title">{itemData.title}</span>
          </div>
          {listItemStatus && listItemStatus.status === "checked" && (
            <Alert variant="success">¡Este producto ya fue comprado!</Alert>
          )}
          {itemData.status !== "active" && (
            <React.Fragment>
              <Alert variant="warning">
                Este producto no está disponible en Mercado Libre actualmente.
              </Alert>
              <Alert variant="info">
                Tendencias en Argentina en productos de la misma categoría.
                <Row>
                  {categoryTrends &&
                    categoryTrends.map((trend, i) => {
                      return (
                        i < 10 && (
                          <Col>
                            <Link
                              to={`/lists/${listId}?tab=search&q=${trend.keyword}`}
                            >
                              {trend.keyword}
                            </Link>
                          </Col>
                        )
                      );
                    })}
                </Row>
              </Alert>
            </React.Fragment>
          )}
          <Row>
            <Col>
              {itemData.pictures && (
                <Container className="carousel">
                  <Carousel
                    variant="dark"
                    nextIcon={<img className="icon" src={Arrow} alt="next" />}
                    prevIcon={
                      <img className="icon icon-prev" src={Arrow} alt="prev" />
                    }
                  >
                    {itemData.pictures.map((picture) => {
                      return (
                        <Carousel.Item key={picture.id}>
                          <img alt={itemData.title} src={picture.url} />
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </Container>
              )}
              <Container></Container>
            </Col>
            <Col>
              <ItemDescription description={itemData.description} />
              <div className="vip-permalink">
                <LinkToMeli permalink={itemData.permalink} />
              </div>
              <div className="vip-price">
                <span className="item-data-price-modal">
                  <NumberFormat
                    value={itemData.price}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"$"}
                  />
                </span>
                <div>
                  {itemHistory !== null && itemHistory.length > 0
                    ? itemHistory[itemHistory.length - 1].quantity
                    : itemData.available_quantity + " "}{" "}
                  unidades disponibles
                </div>
                <div>{itemData.sold_quantity + " "} unidades vendidas</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <LineChart
                width={400}
                height={250}
                data={itemHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date_fetched" />
                <YAxis unit={" u."} dataKey="quantity" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dot={false}
                  animationDuration={5000}
                  dataKey="quantity"
                  stroke="#82ca9d"
                  strokeWidth={5}
                />
              </LineChart>
            </Col>
            <Col>
              <LineChart
                width={400}
                height={250}
                data={itemHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date_fetched" />
                <YAxis name="Precio" unit={"$"} dataKey="price" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dot={false}
                  animationDuration={5000}
                  dataKey="price"
                  stroke="#8884d8"
                  strokeWidth={5}
                />
              </LineChart>
            </Col>
            <Col>
              <LineChart
                width={400}
                height={250}
                data={itemHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date_fetched" />
                <YAxis name="Opiniones" dataKey="reviews_quantity" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dot={false}
                  animationDuration={5000}
                  dataKey="reviews_quantity"
                  stroke="#8884d8"
                  strokeWidth={5}
                />
              </LineChart>
            </Col>
          </Row>
          <Table striped bordered size="sm">
            <thead>
              <tr>
                <th>Atributo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {itemData.attributes.map((attribute) => {
                return (
                  <tr key={attribute.id}>
                    <td>
                      <span className="attribute-name">{attribute.name}</span>
                    </td>
                    <td>{attribute.value_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  );
};

export default ViewItemPage;

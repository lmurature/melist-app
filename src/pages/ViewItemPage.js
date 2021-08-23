import axios from "axios";
import react, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useParams } from "react-router";
import NumberFormat from "react-number-format";
import "./styles/ViewItemPage.scss";
import RestUtils from "../utils/RestUtils";
import Arrow from "../assets/arrow.png";
import LinkToMeli from "../components/LinkToMeli";
import ItemDescription from "../components/ItemDescription";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

const ViewItemPage = () => {
  const { listId, itemId } = useParams();

  const [itemData, setItemData] = useState(null);

  const [itemHistory, setItemHistory] = useState(null);

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
      .then((response) => setItemHistory(response.data))
      .catch((err) => console.log(err));
  }, []);

  return itemData !== null ? (
    <div className="view-item-page">
      <Container>
        <Row>
          <Col>
            {itemData.pictures !== undefined ? (
              <Container className="carousel">
                <Carousel
                  variant="dark"
                  nextIcon={<img className="icon" src={Arrow} />}
                  prevIcon={<img className="icon icon-prev" src={Arrow} />}
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
            ) : (
              ""
            )}
            <Container>
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
                  {itemData.available_quantity + " "} unidades disponibles
                </div>
                <div>{itemData.sold_quantity + " "} unidades vendidas</div>
              </div>
            </Container>
          </Col>
          <Col>
            <div className="vip-title-box">
              <span className="vip-title">{itemData.title}</span>
            </div>
            <ItemDescription description={itemData.description} />
            <div className="vip-permalink">
              <LinkToMeli permalink={itemData.permalink} />
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
                dataKey="price"
                stroke="#8884d8"
                strokeWidth={5}
              />
            </LineChart>
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    ""
  );
};

export default ViewItemPage;

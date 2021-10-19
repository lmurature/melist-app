import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel, Table, Alert } from 'react-bootstrap';
import { useParams } from 'react-router';
import NumberFormat from 'react-number-format';
import './styles/ViewItemPage.scss';
import Arrow from '../assets/arrow.png';
import LinkToMeli from '../components/LinkToMeli';
import ItemDescription from '../components/ItemDescription';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import 'moment/locale/es';
import moment from 'moment';
import ItemsRepository from '../services/repositories/ItemsRepository';
import ListsRepository from '../services/repositories/ListsRepository';

const ViewItemPage = () => {
  const { listId, itemId } = useParams();

  const [itemData, setItemData] = useState(null);

  const [itemHistory, setItemHistory] = useState(null);

  const [categoryTrends, setCategoryTrends] = useState(null);

  const [listItemStatus, setListItemStatus] = useState(null);

  const [apiError, setApiError] = useState(null);

  const uniqBy = (arr, predicate) => {
    const cb =
      typeof predicate === 'function' ? predicate : (o) => o[predicate];
    const result = [];
    const map = new Map();

    arr.forEach((item) => {
      const key = item === null || item === undefined ? item : cb(item);

      if (!map.has(key)) {
        map.set(key, item);
        result.push(item);
      }
    });

    return result;
  };

  const fetchCategoryTrends = async () => {
    if (itemData) {
      const trends = await ItemsRepository.getCategoryTrends(
        itemData.category_id
      );
      setCategoryTrends(trends);
    }
  };

  const fetchData = async () => {
    try {
      const item = await ItemsRepository.getItem(itemId);
      setItemData(item);

      const history = await ItemsRepository.getItemsHistory(itemId);
      for (let i = 0; i < history.length; i++) {
        let date = history[i].date_fetched;
        history[i].date_fetched = moment(date)
          .locale('es')
          .subtract(3, 'hours')
          .fromNow();
      }
      setItemHistory(history);

      const listStatus = await ListsRepository.getItemListStatus(
        listId,
        itemId
      );
      setListItemStatus(listStatus);
    } catch (err) {
      setApiError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemId]);

  useEffect(() => {
    fetchCategoryTrends();
  }, [itemData]);

  return (
    <div className="view-item-page">
      <Container>
        <Alert show={apiError} variant="danger">
          Hubo un error al buscar los datos del producto.
        </Alert>
        <Link to={`/lists/${listId}`}>
          <ArrowLeft /> Atrás
        </Link>
        {itemData && (
          <React.Fragment>
            <div className="vip-title-box">
              <span className="vip-title">{itemData.title}</span>
            </div>
            {listItemStatus && listItemStatus.status === 'checked' && (
              <Alert variant="success">¡Este producto ya fue comprado!</Alert>
            )}
            {itemData.status !== 'active' && (
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
                        <img
                          className="icon icon-prev"
                          src={Arrow}
                          alt="prev"
                        />
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
                      displayType={'text'}
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      prefix={'$'}
                    />
                  </span>
                  <div>
                    {itemHistory !== null && itemHistory.length > 0
                      ? itemHistory[itemHistory.length - 1].quantity + ' '
                      : itemData.available_quantity + ' '}
                    unidades disponibles
                  </div>
                  <div>{itemData.sold_quantity + ' '} unidades vendidas</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <LineChart
                  width={400}
                  height={250}
                  data={
                    itemHistory && [
                      ...uniqBy(itemHistory, (entry) => entry.quantity),
                      itemHistory[itemHistory.length - 1],
                    ]
                  }
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="date_fetched" />
                  <YAxis unit={' u.'} dataKey="quantity" />
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
                  data={
                    itemHistory && [
                      ...uniqBy(itemHistory, (entry) => entry.price),
                      itemHistory[itemHistory.length - 1],
                    ]
                  }
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="date_fetched" />
                  <YAxis name="Precio" unit={'$'} dataKey="price" />
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
                  data={
                    itemHistory && [
                      ...uniqBy(itemHistory, (entry) => entry.reviews_quantity),
                      itemHistory[itemHistory.length - 1],
                    ]
                  }
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
            <Table className="attribute-table" striped bordered size="sm">
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
          </React.Fragment>
        )}
      </Container>
    </div>
  );
};

export default ViewItemPage;

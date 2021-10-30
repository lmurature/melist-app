import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NotificationCard from './NotificationCard';
import './styles/Notifications.scss';

const Notifications = (props) => {
  const { listNotifications, unread } = props;
  const [filter, setFilter] = useState('');

  const isSeen = (index) => {
    return filter === '' ? index >= unread : true;
  };

  const handleFilter = (f) => {
    setFilter(f);
  };

  const getFilterTitle = () => {
    switch (filter) {
      case 'añadió un nuevo producto':
        return 'Agregados';
      case 'se quedó sin stock':
        return 'Sin stock';
      case 'entró en una oferta!':
        return 'Ofertas';
      case 'tuvo un cambio en su precio':
        return 'Precio';
      case 'tiene revisiones nuevas':
        return 'Opiniones';
      case 'comprado por':
        return 'Comprados';
      case 'quedar sin stock':
        return 'Liquidación';
      case 'lista a sus favoritos!':
        return 'Favoritos';
    }
  };

  return (
    <Container className="notifications-root">
      <div className="notifications-filter">Filtrar por:</div>
      <div className="notifications-filter-selector">
        <Row>
          <Col onClick={() => handleFilter('')}>
            <div className="unselectable notifications-filter-item">Todas</div>
          </Col>
          <Col onClick={() => handleFilter('añadió un nuevo producto')}>
            <div className="unselectable notifications-filter-item">
              Agregados
            </div>
          </Col>
          <Col onClick={() => handleFilter('se quedó sin stock')}>
            <div className="unselectable notifications-filter-item">
              Sin stock
            </div>
          </Col>
          <Col onClick={() => handleFilter('entró en una oferta!')}>
            <div className="unselectable notifications-filter-item">
              Ofertas
            </div>
          </Col>
          <Col onClick={() => handleFilter('tuvo un cambio en su precio')}>
            <div className="unselectable notifications-filter-item">Precio</div>
          </Col>
          <Col onClick={() => handleFilter('tiene revisiones nuevas')}>
            <div className="unselectable notifications-filter-item">
              Opiniones
            </div>
          </Col>
          <Col onClick={() => handleFilter('comprado por')}>
            <div className="unselectable notifications-filter-item">
              Comprados
            </div>
          </Col>
          <Col onClick={() => handleFilter('quedar sin stock')}>
            <div className="unselectable notifications-filter-item">
              Liquidación
            </div>
          </Col>
          <Col onClick={() => handleFilter('lista a sus favoritos!')}>
            <div className="unselectable notifications-filter-item">
              Favoritos
            </div>
          </Col>
        </Row>
      </div>
      <div className="filter-title">
        {filter !== '' ? getFilterTitle() : 'Todas las notificaciones'}
      </div>
      {listNotifications &&
        listNotifications
          .filter((l) => l.message.includes(filter))
          .map((n, i) => {
            return (
              <NotificationCard
                key={i}
                message={n.message}
                seen={isSeen(i)}
                timestamp={n.timestamp}
                permalink={n.permalink}
              />
            );
          })}
    </Container>
  );
};

export default Notifications;

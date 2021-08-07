import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/EmptySearchState.css";

const EmptySearchState = (props) => {
  return (
    <Container>
      <div className="empty-state-box">
        <div>
          <span className="search-title">Buscá en Mercadolibre 🔍</span>
        </div>
        <div>
          En esta pestaña podrás buscar productos y ver sus detalles principales
          para agregarlos a la Lista
        </div>
      </div>
    </Container>
  );
};

export default EmptySearchState;

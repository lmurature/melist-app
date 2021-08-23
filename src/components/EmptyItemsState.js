import React from "react";
import { Container } from "react-bootstrap";

const EmptyItemsState = (props) => {
  return (
    <Container>
      <div className="empty-state-box">
        <div>
          <span className="search-title">
            Parece que no tenés ningun producto...
          </span>
        </div>
        <div>
          En la pestaña "Búsqueda" de esta lista vas a poder buscar lo que
          quieras, o podés utilizar Mercado Libre junto con la extensión de ME
          List para agregar productos.
        </div>
      </div>
    </Container>
  );
};

export default EmptyItemsState;

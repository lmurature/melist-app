import store from "store";
import React, { useEffect, useState } from "react";
import RestUtils from "../utils/RestUtils";
import MainImg from "../assets/friendsgift.jpg";
import { Redirect } from "react-router";
import "./styles/Home.scss";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [startUrl, setStartUrl] = useState(RestUtils.getAuthUrl());

  useEffect(() => {
    let auth = store.get("access-token");
    if (auth) {
      setStartUrl("/summary");
    }
  }, []);

  const isAuthenticated = () => {
    return store.get("access-token") !== undefined;
  };

  return (
    <React.Fragment>
      {isAuthenticated() ? <Redirect to="/summary" /> : ""}
      <div className="main-div">
        <div className="info-main">
          <Container>
            <Row>
              <Col>
                <div>
                  <img className="info-gift" src={MainImg} />
                </div>
              </Col>
              <Col md={6} xl={6}>
                <div className="info-title">
                  Tus necesidades y deseos, ahora colaborativos 💛
                </div>
                <div className="info-subtitle">
                  Crea listas de regalos para compartir con amigos y familia,
                  usando la plataforma de Mercadolibre.
                </div>
                <div className="info-subtitle">
                  Llevá el control de los productos en tus listas con el sistema
                  de gráficas de ME List. Enterate de cambios de precio,
                  activación de ofertas, liquidación de unidades de stock y
                  muchas cosas más.
                </div>
                <div className="start-button">
                  <a href={startUrl}>
                    <Button className="new-list-button">Crea tus listas</Button>
                  </a>
                </div>
              </Col>
              <Col md={1} sm={1} xl={1} />
            </Row>
          </Container>
        </div>
        <div className="info-how-it-works">
          <Container>
            <div className="info-how-it-works-title">¿Cómo funciona?</div>
            <Row className="step-count">
              <Col>1. Ingresá con tu cuenta de Mercadolibre</Col>
              <Col>2. Creá tus listas</Col>
              <Col>3. Agregá productos</Col>
              <Col>4. Otorgale acceso a tus amigos</Col>
              <Col>
                5. Comprá en el momento ideal.
                Nosotros te notificamos.
              </Col>
            </Row>
            <Row className="step-description">
              <Col>
                Podés conectarte con tu cuenta de Mercadolibre para comenzar a
                crear tus listas de publicaciones con los productos que desees.
              </Col>
              <Col>
                Crea tus listas con un título atrapante, agregales una
                descripción y elegí el tipo de privacidad que mejor te siente.
              </Col>
              <Col>
                Agrega los productos que quieras de la plataforma de
                Mercadolibre utilizando la web ME List o la{" "}
                <a href="https://chrome.google.com/webstore/detail/extension-me-list/eghehobahpmfohnhhhoekagidlfpfjna?hl=es">
                  extension de Chrome
                </a>{" "}
                para navegar por Mercadolibre e ir agregando los productos que
                te encuentres.
              </Col>
              <Col>
                Agrega a tus amigos como colaboradores en tus listas, podés
                otorgarles acceso de lectura, modificación o qué puedan marcar
                los productos como comprados o reservados.{" "}
              </Col>
              <Col>
                Todos los productos que estén en listas de ME List son
                trackeados día a día. Monitoreando cambios de precio, activación
                de ofertas, liquidación de unidades de stock y las nuevas
                revisiónes que otros usuarios realicen sobre ellos.
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

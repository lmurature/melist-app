import store from "store";
import React, { useEffect, useState } from "react";
import RestUtils from "../utils/RestUtils";
import MainImg from "../assets/friendsgift.jpg";
import Fast from "../assets/fast.png";
import Colaborative from "../assets/colaborative.png";
import Accesible from "../assets/accesible.png";
import { Redirect } from "react-router";
import "./styles/Home.scss";
import { Col, Container, Row, Button } from "react-bootstrap";

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
                  Tus necesidades y deseos, ahora pueden ser colaborativos 💛
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
        <div className="info-properties">
          <Container>
            <div className="properties">
              <Row>
                <Col xs={12} sm={12} lg md xl xxl>
                  <div className="properties-title">Facil y rápido</div>
                </Col>
                <Col xs={12} sm={12} lg md xl xxl>
                  <div className="properties-description">
                    Creá tus listas y comenzá a utilizar ME List. Agregá productos utilizando la búsqueda, monitorea
                    los cambios de precio y stock y compra en el momento ideal.
                  </div>
                </Col>
                <Col xs={12} sm={12} lg md xl xxl>
                  <div className="properties-img">
                    <img src={Fast} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="properties">
              <Row>
                <Col xs={12} sm={12} lg md xl xxl>
                  <div className="properties-title">Colaborativo</div>
                </Col>
                <Col xs={12} sm={12} lg md xl xxl>
                  <div className="properties-description">
                    Otorgales a tus amigos y familiares acceso a tus listas. 
                    Que sepan cuales son tus gustos, que querés que te regalen.
                    Ellos podrán marcar los productos como comprados, agregar nuevos o modificar la lista, 
                    dependiendo el acceso que les otorgues.
                  </div>
                </Col>
                <Col xs={12} sm={12} lg md xl xxl>
                  <div className="properties-img">
                    <img src={Colaborative} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="properties">
              <Row>
                <Col xs={12} sm={12} lg md xl xxl>
                  <div className="properties-title">Accesible</div>
                </Col>
                <Col xs={12} sm={12} lg md xl xxl>
                  <div className="properties-description">
                    ME List te provee una forma de organizar tus deseos o listas de compras utilizando publicaciones 
                    de Mercadolibre. Podés agregar productos a tus listas utilizando la búsqueda o la extensión de Chrome.
                  </div>
                </Col>
                <Col xs={12} sm={12} lg md xl xxl>
                  <div className="properties-img">
                    <img src={Accesible} />
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="info-how-it-works">
          <Container>
            <div className="info-how-it-works-title">¿Cómo funciona?</div>
            <Row>
              <Col xs={12} sm={12} lg md xl xxl>
                <div className="step-count">1. Ingresa con Mercadolibre</div>
                <div className="step-description">
                  Podés conectarte con tu cuenta de Mercadolibre para comenzar a
                  crear tus listas de publicaciones con los productos que
                  desees.
                </div>
              </Col>
              <Col xs={12} sm={12} lg md xl xxl>
                <div className="step-count">2. Creá tus listas</div>
                <div className="step-description">
                  Crea tus listas con un título atrapante, agregales una
                  descripción y elegí el tipo de privacidad que mejor te siente.
                </div>
              </Col>
              <Col xs={12} sm={12} lg md xl xxl>
                <div className="step-count">3. Agregá productos</div>
                <div className="step-description">
                  Agrega los productos que quieras de la plataforma de
                  Mercadolibre utilizando la web ME List o la{" "}
                  <a href="https://chrome.google.com/webstore/detail/extension-me-list/eghehobahpmfohnhhhoekagidlfpfjna?hl=es">
                    extension de Chrome
                  </a>{" "}
                  para navegar por Mercadolibre e ir agregando los productos que
                  te encuentres.
                </div>
              </Col>
              <Col xs={12} sm={12} lg md xl xxl>
                <div className="step-count">
                  4. Otorgale acceso a tus amigos
                </div>
                <div className="step-description">
                  Agrega a tus amigos como colaboradores en tus listas, podés
                  otorgarles acceso de lectura, modificación o qué puedan marcar
                  los productos como comprados o reservados.
                </div>
              </Col>
              <Col xs={12} sm={12} lg md xl xxl>
                <div className="step-count">5. Comprá en el momento ideal.</div>
                <div className="step-description">
                  Todos los productos que estén en listas de ME List son
                  trackeados día a día. Nosotros te notificamos, nuestro
                  monitoreo cambios de precio, activación de ofertas,
                  liquidación de unidades de stock lograrán que encuentres el
                  mejor momento para realizar la compra.
                </div>
              </Col>
            </Row>
            <a href={startUrl}>
              <Button className="new-list-button">Quiero comenzar</Button>
            </a>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

import React, { useState } from "react";
import { Container, Button, Form, Col, Row, FloatingLabel } from "react-bootstrap";
import Arrow from "../assets/arrow.png";
import "./styles/Share.css";

const Share = (props) => {
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="share">
      <Container>
        <Row>
          <Col>
            <div className="search-users-title">Buscar usuarios</div>
          </Col>
          <Col lg={1} md={1} xl={1} xs={1} xxl={1} />
          <Col>
            <div className="search-users-title">Colaboradores</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col lg={9} md={9} xl={9} xxl={9}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Buscá por nombre, apellido, email o nickname"
                  className="mb-3"
                >
                  <Form.Control
                    className="input-form-user"
                    onChange={handleUserInput}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="search-button"
                  onClick={() => {
                    console.log(userInput);
                  }}
                >
                  Buscar 🔍
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg={1} md={1} xl={1} xs={1} xxl={1} />
          <Col>
            <div>
              {" "}
              <span className="info-bold">· Read 👀</span>: Sólo accede a la
              lista para lectura.
            </div>
            <div>
              {" "}
              <span className="info-bold">· Write 📝</span>: Puede agregar y
              eliminar productos.
            </div>
            <div>
              {" "}
              <span className="info-bold">· Check ✅</span>: Puede marcar
              productos como comprados.
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="share-box">
              <Container>// TODO: search data</Container>
            </div>
          </Col>
          <Col lg={1} md={1} xl={1} xs={1} xxl={1}>
            <div className="arrow-box">
              <button>
                <img className="arrow" src={Arrow} />
              </button>
            </div>
          </Col>
          <Col>
            <div className="share-box">
              <Container>// TODO: colabs data</Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Share;

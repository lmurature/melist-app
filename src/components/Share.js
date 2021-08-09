import React, { useEffect, useState } from "react";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import RestUtils from "../utils/RestUtils";
import axios from "axios";
import Arrow from "../assets/arrow.png";
import "./styles/Share.css";

const Share = (props) => {
  const { listId } = props;

  const [userInput, setUserInput] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const [colabs, setColabs] = useState([]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSearch = () => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/users/search?q=${userInput}`,
        RestUtils.getHeaders()
      )
      .then((response) => setSearchResult(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}/shares`,
        RestUtils.getHeaders()
      )
      .then((response) => setColabs(response.data))
      .catch((err) => console.log(err));
  }, []);

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
                <Form.Control
                  className="input-form-user"
                  placeHolder="Nombre, apellido, email o nickname"
                  onChange={handleUserInput}
                />
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="search-button"
                  onClick={handleSearch}
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
              <span className="info-bold">· Read 👀</span>: Puede ver tu lista.
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
              <Container>
                {searchResult.map((user) => {
                  // todo: un componente seleccionable
                  return (
                    <div>
                      {user.first_name +
                        " " +
                        user.last_name +
                        " " +
                        "(" +
                        user.nickname +
                        ")"}
                    </div>
                  );
                })}
              </Container>
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
              <Container>
                {colabs.map((c) => {
                  // todo: un componente
                  return (
                    <div>
                      {c.user.first_name +
                        " " +
                        c.user.last_name +
                        " " +
                        "(" +
                        c.user.nickname +
                        ")" +
                        " " +
                        c.share_type +
                        " 🗑️"}
                    </div>
                  );
                })}
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Share;

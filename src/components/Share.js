import React, { useCallback, useEffect, useState } from "react";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import RestUtils from "../utils/RestUtils";
import axios from "axios";
import "./styles/Share.css";

const Share = (props) => {
  const { listId, ownerId } = props;

  const [userInput, setUserInput] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const [colabs, setColabs] = useState([]);

  const [usersToRequest, setUsersToRequest] = useState(new Map());
  const [shareTypeRequest, setShareTypeRequest] = useState("read");

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

  const shouldCheckboxBeDisabled = (userId) => {
    if (userId === ownerId) {
      return true;
    }

    for (let i = 0; i < colabs.length; i++) {
      if (colabs[i].user_id === userId) {
        return true;
      }
    }

    return false;
  };

  const handleCheckbox = (e) => {
    const userId = e.target.value;
    const isChecked = e.target.checked;

    usersToRequest.set(userId, isChecked);

    setUsersToRequest(usersToRequest);

    console.log(usersToRequest);
  };

  const handleRadio = (e) => {
    setShareTypeRequest(e.target.value);
  };

  const shouldBeChecked = (button) => {
    return button === shareTypeRequest;
  };

  const handleShareRequest = () => {
    let finalRequest = [];
    usersToRequest.forEach((isChecked, userId) => {
      if (isChecked) {
        const shareRequest = {
          user_id: parseInt(userId),
          share_type: shareTypeRequest,
        };
        finalRequest.push(shareRequest);
      }
    });

    axios
      .put(
        `${RestUtils.getApiUrl()}/api/lists/access/${listId}`,
        finalRequest,
        RestUtils.getHeaders()
      )
      .then((response) => {
        getColaborators();
        // clean state
        setUsersToRequest(new Map());
      })
      .catch((err) => {
        alert("Hubo un error al compartir tu lista");
        console.log(err);
      });
  };

  const getColaborators = () => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}/shares`,
        RestUtils.getHeaders()
      )
      .then((response) => setColabs(response.data))
      .catch((err) =>
        err.response !== undefined && err.response.status !== 404
          ? console.log(err)
          : ""
      );
  };

  useEffect(() => {
    getColaborators();
  }, [getColaborators]);

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
                  placeholder="Nombre, apellido, email o nickname"
                  onChange={handleUserInput}
                />
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="search-button"
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg={1} md={1} xl={1} xs={1} xxl={1} />
          <Col>
            <Container>
              <div>
                <span className="info-bold">· Read 👀</span>: Puede ver tu
                lista.
              </div>
              <div>
                <span className="info-bold">· Write 📝</span>: Puede agregar y
                eliminar productos.
              </div>
              <div>
                <span className="info-bold">· Check ✅</span>: Puede marcar
                productos como comprados.
              </div>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="share-box">
              <Container>
                {searchResult.map((user) => {
                  return (
                    <Form.Check
                      key={user.id}
                      disabled={shouldCheckboxBeDisabled(user.id)}
                      onClick={handleCheckbox}
                      value={user.id}
                      type="checkbox"
                      label={
                        user.first_name +
                        " " +
                        user.last_name +
                        " " +
                        "(" +
                        user.nickname +
                        ")"
                      }
                    />
                  );
                })}
              </Container>
            </div>
          </Col>
          <Col lg={1} md={1} xl={1} xs={1} xxl={1}>
            <Row>
              <Col>
                <div className="share-type-radios">
                  <Form.Check
                    checked={shouldBeChecked("read")}
                    onChange={handleRadio}
                    type="radio"
                    label="Read"
                    value="read"
                  />
                  <Form.Check
                    checked={shouldBeChecked("write")}
                    onChange={handleRadio}
                    type="radio"
                    label="Write"
                    value="write"
                  />
                  <Form.Check
                    checked={shouldBeChecked("check")}
                    onChange={handleRadio}
                    type="radio"
                    label="Check"
                    value="check"
                  />
                </div>
              </Col>
              <Col>
                <div className="button-box">
                  <Button
                    className="search-button"
                    onClick={handleShareRequest}
                  >
                    Guardar
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <div className="share-box">
              <Container>
                {colabs.map((c) => {
                  // todo: un componente
                  return (
                    <div key={c.user_id}>
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

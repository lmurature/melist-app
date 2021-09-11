import React, { useEffect, useState } from "react";
import { Container, Button, Form, Col, Row } from "react-bootstrap";
import RestUtils from "../utils/RestUtils";
import axios from "axios";
import "./styles/Share.scss";

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
      .catch((err) => alert("No se encontraron usuarios."));
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
  };

  const handleRadio = (e) => {
    setShareTypeRequest(e.target.value);
  };

  const shouldBeChecked = (button) => {
    return button === shareTypeRequest;
  };

  const clearState = () => {
    setSearchResult([]);
    setSearchResult(searchResult);
    getColaborators();
    setUsersToRequest(new Map());
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
        clearState();
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
      .then((response) => {
        setColabs(response.data);
      })
      .catch((err) =>
        err.response !== undefined && err.response.status !== 404
          ? console.log(err)
          : ""
      );
  };

  const formatShareType = (shareType) => {
    switch (shareType) {
      case "read":
        return "👀";
      case "write":
        return "📝";
      case "check":
        return "✅";
      default:
        return "";
    }
  };

  const revokeColaborator = (userId) => {
    if (
      window.confirm(
        "¿Estás seguro que quieres revocarle el acceso a este usuario?"
      )
    ) {
      axios
        .delete(
          `${RestUtils.getApiUrl()}/api/lists/access/${listId}?user_id=${userId}`,
          RestUtils.getHeaders()
        )
        .then((response) => setColabs(response.data))
        .catch((err) => alert("Hubo un error al quitar los permisos."));
    }
  };

  useEffect(() => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}/shares`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        setColabs(response.data);
      })
      .catch((err) =>
        err.response !== undefined && err.response.status !== 404
          ? console.log(err)
          : ""
      );
  }, [listId]);

  return (
    <div className="share">
      <Container>
        <Row>
          <Col lg={6} md={6} xl={6} xxl={6}>
            <div className="search-users-title">Buscar usuarios</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col lg={9} md={9} xl={9} xxl={9}>
                <Form.Control
                  className="input-form-user"
                  placeholder="Nombre, apellido, email o nickname"
                  value={userInput}
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
          <Col sm={12} lg={2} md={2} xl={2} xxl={2} className="type-save">
            <div className="share-type-radios">
              <div className="checkbox-title">Otorgar acceso</div>
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
            <div className="save-box">
              <Button
                className="search-button"
                onClick={handleShareRequest}
              >
                Guardar
              </Button>
            </div>
          </Col>
          <Col>
            <div className="share-box">
              <Container>
                {colabs.map((c) => {
                  return (
                    <div className="colabs" key={c.user_id}>
                      <Row>
                        <Col lg={8} md={8} xl={8} xs={8} xxl={8}>
                          {c.user.first_name +
                            " " +
                            "(" +
                            c.user.nickname +
                            ")" +
                            " " +
                            formatShareType(c.share_type)}
                        </Col>
                        <Col>
                          <Button
                            size="sm"
                            className="revoke-button"
                            variant="danger"
                            onClick={() => revokeColaborator(c.user_id)}
                          >
                            Revocar
                          </Button>
                        </Col>
                      </Row>
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

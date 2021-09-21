import React, { useEffect, useState } from "react";
import { Container, Button, Form, Col, Row, Alert } from "react-bootstrap";
import "./styles/Config.scss";
import ListsRepository from "../services/repositories/ListsRepository";

const Config = (props) => {
  const { title, description, privacy, listId } = props;

  const [listTitle, setListTitle] = useState("");
  const [listDesc, setListDesc] = useState("");
  const [listPrivacy, setListPrivacy] = useState("");

  const [successUpdateList, setSuccessUpdateList] = useState(false);
  const [errorUpdateList, setErrorUpdateList] = useState(false);

  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setListDesc(e.target.value);
  };

  const togglePrivacy = () => {
    setListPrivacy(listPrivacy === "public" ? "private" : "public");
  };

  const getPrivacySwitchLabel = () => {
    return listPrivacy === "public" ? "Lista pública 🌎" : "Lista privada 🔐";
  };

  const getPrivacyMutedText = () => {
    return listPrivacy === "public"
      ? "Si tu lista era privada y pasa a ser pública, cualquier tendrá acceso de 'Read' y tu lista aparecera en la seccion de 'Explorar'. Para administrar accesos de 'Write' o 'Check' a los usuarios que desees lo deberás configurar en la seccion 'Compartir'"
      : "Si tu lista era publica, y pasa a ser privada, se revocarán todos los favoritos de tu lista.";
  };

  const handleSubmit = async () => {
    try {
      await ListsRepository.updateList(
        listId,
        listTitle,
        listDesc,
        listPrivacy
      );
      setSuccessUpdateList(true);
    } catch (err) {
      setErrorUpdateList(true);
    }
    setTimeout(() => {
      setSuccessUpdateList(false);
      setErrorUpdateList(false);
    }, 10000);
  };

  useEffect(() => {
    setListTitle(title || "");
    setListDesc(description || "");
    setListPrivacy(privacy || "");
  }, [title, description, privacy]);

  const shouldBeDisabled = () => {
    return (
      listTitle === title && listDesc === description && listPrivacy === privacy
    );
  };

  return (
    <div className="config">
      <Container>
        <Alert show={successUpdateList} variant="success" className="add-alert">
          Cambios guardados con éxito. Refrescá la página para notarlos.
        </Alert>
        <Alert show={errorUpdateList} variant="danger" className="add-alert">
          Oh... Parece que ocurrió un error al guardar los cambios.
        </Alert>
        <Row>
          <Col>
            <div className="form-title">Datos generales</div>
          </Col>
          <Col>
            <div className="form-title">Privacidad</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Nombre de la lista</Form.Label>
            <Form.Control
              size="md"
              value={listTitle}
              onChange={handleTitleChange}
            />
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              onChange={handleDescChange}
              size="md"
              as="textarea"
              value={listDesc}
              style={{ height: "150px" }}
            />
          </Col>
          <Col>
            {" "}
            <Form.Label>Privacidad de la Lista</Form.Label>
            <Form.Check
              size="lg"
              type="switch"
              id="custom-switch"
              onChange={togglePrivacy}
              label={getPrivacySwitchLabel()}
            />
            <Form.Text className="text-muted">
              {getPrivacyMutedText()}
            </Form.Text>
            <Button
              variant="primary"
              disabled={shouldBeDisabled()}
              className="create-button"
              size="md"
              type="submit"
              onClick={handleSubmit}
            >
              Guardar cambios
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Config;

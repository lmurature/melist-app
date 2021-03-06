import { useState } from "react";
import { Container, Button, Form, Col, Spinner, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./styles/CreateList.scss";
import ListsRepository from "../services/repositories/ListsRepository";

const CreateList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("public");

  const [submitted, setSubmitted] = useState(false);

  const [apiError, setApiError] = useState("");
  const [list, setList] = useState(null);

  const createList = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const listResult = await ListsRepository.createList(getBody());
      setList(listResult);
    } catch (err) {
      setApiError(err);
    }
  };

  const getBody = () => {
    return { title: title, description: description, privacy: privacy };
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const togglePrivacy = () => {
    setPrivacy(privacy === "public" ? "private" : "public");
  };

  const getPrivacyMutedText = () => {
    return privacy === "public"
      ? "Cualquiera puede acceder a tu Lista a partir de la URL."
      : "Sólo quien autorices tendrá permiso de acceder a tu lista.";
  };

  const getPrivacySwitchLabel = () => {
    return privacy === "public" ? "Lista pública 🌎" : "Lista privada 🔐";
  };

  const showSpinnerListOrApiError = () => {
    if (list === null && apiError === "") {
      return <Spinner animation="border" />;
    }

    if (apiError !== "") {
      let { message, status } = apiError;
      return (
        <Alert variant="danger">
          Status: {status}, Error: {message}
        </Alert>
      );
    }

    return <Redirect to={`/lists/${list.id}`} />;
  };

  return (
    <Container>
      <Col>
        <Form className="list-form">
          <h1 className="create-title">Crear nueva Lista</h1>
          <div className="text-center">
            {submitted ? showSpinnerListOrApiError() : ""}
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la lista</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Ej. Regalos de Navidad"
              onChange={handleTitle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              size="lg"
              as="textarea"
              placeholder="Información adicional, redes sociales, para qué se va a usar, dirección de envio, numero de whatsapp o email para consultas."
              style={{ height: "150px" }}
              onChange={handleDescription}
            />
          </Form.Group>
          <Form.Group>
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
          </Form.Group>
          <div className="text-center">
            <Button
              variant="primary"
              className="create-button"
              size="lg"
              type="submit"
              onClick={createList}
            >
              Crear lista
            </Button>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default CreateList;

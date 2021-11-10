import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Form,
  Col,
  Row,
  Alert,
  Modal,
  Dropdown,
} from 'react-bootstrap';
import './styles/Share.scss';
import ListsRepository from '../services/repositories/ListsRepository';
import ListsService from '../services/ListsService';
import UsersService from '../services/UsersService';

const Share = (props) => {
  const { listId, ownerId } = props;

  const [userInput, setUserInput] = useState('');

  const [searchResult, setSearchResult] = useState([]);
  const [colabs, setColabs] = useState([]);

  const [pendings, setPendings] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const [usersToRequest, setUsersToRequest] = useState(new Map());
  const [shareTypeRequest, setShareTypeRequest] = useState('read');

  const [inviteTypeRequest, setInviteTypeRequest] = useState('read');
  const [emailToInvite, setEmailToInvite] = useState('');
  const [readyToSubmitInvite, setReadyToSubmitInvite] = useState(false);

  const [apiErr, setApiErr] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setShowInviteModal(false);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSearch = async () => {
    if (userInput !== '') {
      setUsersToRequest(new Map());
      try {
        const result = await UsersService.searchUsers(userInput);
        setSearchResult(result);
      } catch (err) {
        setSearchResult([]);
        setSearchError(err);
        setApiErr(err);
      }

      setSubmitted(true);
    }
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

  const handleRadioInvite = (e) => {
    setInviteTypeRequest(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailToInvite(e.target.value);
  };

  const shouldBeChecked = (button) => {
    return button === shareTypeRequest;
  };

  const shouldBeCheckedInvite = (button) => {
    return button === inviteTypeRequest;
  };

  const clearState = () => {
    setSearchResult([]);
    setSearchResult(searchResult);
    setEmailToInvite('');
    getColaborators();
    getPendings();
    setUsersToRequest(new Map());
  };

  const handleShareRequest = async () => {
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

    try {
      await ListsService.giveAccessToUsers(listId, finalRequest);
      clearState();
    } catch (err) {
      setApiErr(err);
    }
  };

  const handleEmailInvitation = async () => {
    if (!emailIsAlreadyInvited() && emailToInvite !== '') {
      setReadyToSubmitInvite(false);
      const email = emailToInvite.trim();
      try {
        await ListsService.inviteUsersByEmail(email, listId, inviteTypeRequest);
        clearState();
      } catch (err) {
        setApiErr(err);
      }
      setReadyToSubmitInvite(true);
    }
  };

  const getColaborators = async () => {
    try {
      const listColabs = await ListsRepository.getListColaborators(listId);
      setColabs(listColabs);
    } catch (err) {
      setApiErr(err);
    }
  };

  const getPendings = async () => {
    try {
      const listColabs = await ListsRepository.getPendingUserInvites(listId);
      setPendings(listColabs);
    } catch (err) {
      setApiErr(err);
    }
  };

  const formatShareType = (shareType) => {
    switch (shareType) {
      case 'read':
        return 'Lector';
      case 'write':
        return 'Modificador';
      case 'check':
        return 'Comprador';
      default:
        return '';
    }
  };

  const revokeColaborator = async (userId) => {
    if (
      window.confirm(
        '¿Estás seguro que quieres revocarle el acceso a este usuario?'
      )
    ) {
      try {
        const colabResult = await ListsRepository.revokeAccessToUser(
          listId,
          userId
        );
        setColabs(colabResult);
      } catch (err) {
        setApiErr(err);
      }
    }
  };

  const emailIsAlreadyInvited = () => {
    return (
      pendings.filter((p) => p.email === emailToInvite.trim()).length > 0 ||
      colabs.filter((c) => c.user.email === emailToInvite.trim()).length > 0
    );
  };

  useEffect(() => {
    getColaborators();
    getPendings();
  }, [listId]);

  return (
    <div className="share">
      <Container>
        <Alert
          show={apiErr && apiErr.response.status !== 404}
          variant="danger"
          className="add-alert"
        >
          Hubo un error al ejecutar la acción en el servidor.
        </Alert>
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
                <span className="info-bold">· Lectura 👀</span>: Puede ver tu
                lista.
              </div>
              <div>
                <span className="info-bold">· Modificación 📝</span>: Puede
                agregar y eliminar productos.
              </div>
              <div>
                <span className="info-bold">· Comprador ✅</span>: Puede marcar
                productos como comprados.
              </div>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="share-box">
              <Container>
                {searchResult && searchResult.length
                  ? searchResult.map((user) => {
                      return (
                        <Form.Check
                          key={user.id}
                          disabled={shouldCheckboxBeDisabled(user.id)}
                          onClick={handleCheckbox}
                          value={user.id}
                          type="checkbox"
                          label={
                            user.first_name +
                            ' ' +
                            user.last_name +
                            ' ' +
                            '(' +
                            user.nickname +
                            ')'
                          }
                        />
                      );
                    })
                  : submitted && (
                      <Container className="no-users-found">
                        <div>
                          No se encontraron usuarios registrados en Melist según
                          el criterio de búsqueda.
                        </div>
                        <div
                          className="invite"
                          onClick={() => setShowInviteModal(true)}
                        >
                          Enviar invitaciones via E-Mail
                        </div>
                      </Container>
                    )}
              </Container>
            </div>
          </Col>
          <Col sm={12} lg={2} md={2} xl={2} xxl={2} className="type-save">
            <div className="share-type-radios">
              <div className="checkbox-title">Otorgar acceso</div>
              <Form.Check
                checked={shouldBeChecked('read')}
                onChange={handleRadio}
                type="radio"
                label="Lectura"
                value="read"
              />
              <Form.Check
                checked={shouldBeChecked('write')}
                onChange={handleRadio}
                type="radio"
                label="Modificación"
                value="write"
              />
              <Form.Check
                checked={shouldBeChecked('check')}
                onChange={handleRadio}
                type="radio"
                label="Comprador"
                value="check"
              />
            </div>
            <div className="save-box">
              <Button className="search-button" onClick={handleShareRequest}>
                Guardar
              </Button>
            </div>
          </Col>
          <Col>
            <div className="share-box">
              <Container>
                {colabs &&
                  colabs.map((c) => {
                    return (
                      <div className="colabs" key={c.user_id}>
                        <Row>
                          <Col lg={8} md={8} xl={8} xs={8} xxl={8}>
                            {c.user.first_name +
                              ' ' +
                              '(' +
                              c.user.nickname +
                              ')' +
                              ' '}
                            <span className="colabs-type">
                              {formatShareType(c.share_type)}
                            </span>
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
      <Modal
        size="lg"
        show={showInviteModal}
        onHide={handleClose}
        animation={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Invitar usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Podés invitar usuarios que no estén registrados en Melist utilizando
            sus E-Mails.
          </div>
          <div>Una vez inicien sesión, serán colaboradores de tu lista.</div>
          <div className="pendings">
            <div className="pendings-title">Invitar a colaborar</div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={emailToInvite}
                  onChange={handleEmailChange}
                />
                {emailIsAlreadyInvited() && (
                  <div className="user-already-invited">
                    Este usuario ya fue invitado o ya es colaborador de la
                    lista.
                  </div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Tipo de Acceso</Form.Label>
                <Form.Check
                  checked={shouldBeCheckedInvite('read')}
                  onChange={handleRadioInvite}
                  type="radio"
                  label="Lectura"
                  value="read"
                />
                <Form.Check
                  checked={shouldBeCheckedInvite('write')}
                  onChange={handleRadioInvite}
                  type="radio"
                  label="Modificación"
                  value="write"
                />
                <Form.Check
                  checked={shouldBeCheckedInvite('check')}
                  onChange={handleRadioInvite}
                  type="radio"
                  label="Comprador"
                  value="check"
                />
              </Form.Group>
              <Form.Group>
                <Button
                  disabled={emailIsAlreadyInvited() || !readyToSubmitInvite}
                  onClick={handleEmailInvitation}
                >
                  Invitar
                </Button>
              </Form.Group>
            </Form>
          </div>
          <div className="pendings">
            <div className="pendings-title">Invitados pendientes</div>
            {pendings &&
              pendings.map((p) => {
                return (
                  <div key={p.email}>
                    {p.email} <span>{formatShareType(p.share_type)}</span>
                  </div>
                );
              })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver atrás
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Share;

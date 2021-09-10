import { useEffect, useState } from "react";
import RestUtils from "../utils/RestUtils";
import axios from "axios";
import { Container, Button, Row, Col } from "react-bootstrap";
import ListCard from "../components/ListCard";
import { PlusCircle } from "react-bootstrap-icons";
import "./styles/Summary.scss";
import "animate.css";

const Summary = (props) => {
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [lists, setLists] = useState([]);
  const [sharedLists, setSharedLists] = useState([]);
  const [favouriteLists, setFavouriteLists] = useState([]);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    axios
      .get(`${RestUtils.getApiUrl()}/api/users/me`, RestUtils.getHeaders())
      .then((response) => setUser(response.data))
      .catch((err) => setApiError(err));

    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/all_owned`,
        RestUtils.getHeaders()
      )
      .then((response) => setLists(response.data))
      .catch((err) => setApiError(err));

    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/all_shared`,
        RestUtils.getHeaders()
      )
      .then((response) => setSharedLists(response.data))
      .catch((err) => setApiError(err));

    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/favorites`,
        RestUtils.getHeaders()
      )
      .then((response) => setFavouriteLists(response.data))
      .catch((err) => setApiError(err));
  }, []);

  const getCapitalizedName = () =>
    user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);

  return (
    <Container className="main">
      <h1 className="hi-title animate__animated animate__fadeIn">
        Hola {user && getCapitalizedName()}
        <span className="hi-emoji">👋</span>
      </h1>
      <div className="main-list-view">
        <h2 className="my-lists-heading">
          Mis Listas 📋{" "}
          <Button href="/list/create" className="new-list-button">
            Crear nueva lista
          </Button>
        </h2>
        <div className="my-lists">
          <Row>
            {lists.length > 0 ? (
              lists.map((l, i) => {
                return (
                  <Col
                    className="animate__animated animate__fadeIn"
                    key={l.id}
                    lg={2}
                    md={3}
                    xl={2}
                    xs={6}
                    xxl={2}
                  >
                    <ListCard
                      key={l.id}
                      id={l.id}
                      index={i}
                      title={l.title}
                      description={l.description}
                      dateCreated={l.date_created}
                      privacy={l.privacy}
                      notifications={l.notifications}
                    />
                  </Col>
                );
              })
            ) : (
              <Container className="empty-state-text">
                No tenés listas
              </Container>
            )}
            <Col lg={2} md={3} xl={2} xs={6} xxl={2}>
              <Button href="/list/create" className="cross-add-list-button">
                <PlusCircle />
              </Button>
            </Col>
          </Row>
        </div>
        <h2 className="shared-lists-heading">Compartidas conmigo 🙋‍♂️</h2>
        <div className="shared-lists">
          <Row>
            {sharedLists.length > 0 ? (
              sharedLists.map((l, i) => {
                return (
                  <Col
                    className="animate__animated animate__fadeIn"
                    key={l.id}
                    lg={2}
                    md={3}
                    xl={2}
                    xs={6}
                    xxl={2}
                  >
                    <ListCard
                      key={l.id}
                      id={l.id}
                      index={i}
                      title={l.title}
                      description={l.description}
                      dateCreated={l.date_created}
                      privacy={l.privacy}
                      notifications={l.notifications}
                    />
                  </Col>
                );
              })
            ) : (
              <Container className="empty-state-text">
                No tenés listas compartidas
              </Container>
            )}
          </Row>
        </div>
        <h2 className="favourites-heading">
          Favoritos 🌟{" "}
          <Button href="/explore" className="search-lists-button">
            Explorar
          </Button>
        </h2>
        <div className="favourite-lists">
          <Row>
            {favouriteLists.length > 0 ? (
              favouriteLists.map((l, i) => {
                return (
                  <Col
                    className="animate__animated animate__fadeIn"
                    key={l.id}
                    lg={2}
                    md={3}
                    xl={2}
                    xs={6}
                    xxl={2}
                  >
                    <ListCard
                      key={l.id}
                      id={l.id}
                      index={i}
                      title={l.title}
                      description={l.description}
                      dateCreated={l.date_created}
                      privacy={l.privacy}
                    />
                  </Col>
                );
              })
            ) : (
              <Container className="empty-state-text">
                No tenes ninguna lista favorita, podés explorar las listas
                públicas
              </Container>
            )}
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Summary;

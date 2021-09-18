import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import ListCard from "../components/ListCard";
import { PlusCircle } from "react-bootstrap-icons";
import "./styles/Summary.scss";
import "animate.css";
import { Link } from "react-router-dom";
import UsersService from "../services/UsersService";
import ListsService from "../services/ListsService";

const Summary = (props) => {
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [lists, setLists] = useState([]);
  const [sharedLists, setSharedLists] = useState([]);
  const [favouriteLists, setFavouriteLists] = useState([]);
  const [apiError, setApiError] = useState(null); // TODO: manage apiError.
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [first_name, last_name] = await UsersService.getUser();
      setUser({ first_name: first_name, last_name: last_name });

      const favorites = await ListsService.getFavoriteLists();
      setFavouriteLists(favorites);

      const ownedLists = await ListsService.getOwnedLists();
      setLists(ownedLists);

      const shared = await ListsService.getSharedLists();
      setSharedLists(shared);

      setLoading(false);
    } catch (err) {
      setApiError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCapitalizedName = () =>
    user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);

  return (
    <Container className="main">
      <Alert show={apiError} variant="danger" className="add-alert">
        Hubo un error al cargar las listas.
      </Alert>
      <h1 className="hi-title animate__animated animate__fadeIn">
        Hola {user && getCapitalizedName()}
        <span className="hi-emoji">👋</span>
      </h1>
      <div className="main-list-view">
        <h2 className="my-lists-heading">
          Mis Listas 📋{" "}
          <Link to="/list/create">
            <Button className="new-list-button">Crear nueva lista</Button>
          </Link>
        </h2>
        <div className="my-lists">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Row>
              {lists.length ? (
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
                <Link to="/list/create">
                  <Button className="cross-add-list-button">
                    <PlusCircle />
                  </Button>
                </Link>
              </Col>
            </Row>
          )}
        </div>
        <h2 className="shared-lists-heading">Compartidas conmigo 🙋‍♂️</h2>
        <div className="shared-lists">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Row>
              {sharedLists.length ? (
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
          )}
        </div>
        <h2 className="favourites-heading">
          Favoritos 🌟{" "}
          <Link to="/explore">
            <Button className="search-lists-button">Explorar</Button>
          </Link>
        </h2>
        <div className="favourite-lists">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Row>
              {favouriteLists.length ? (
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
          )}
        </div>
      </div>
    </Container>
  );
};

export default Summary;

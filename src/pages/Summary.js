import react, { useEffect, useState } from "react";
import RestUtils from "../utils/RestUtils";
import axios from "axios";
import { Container, Button, Row, Col } from "react-bootstrap";
import ListCard from "../components/ListCard";
import "./styles/Summary.css";

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
        `${RestUtils.getApiUrl()}/api/lists/get/favourites`,
        RestUtils.getHeaders()
      )
      .then((response) => setFavouriteLists(response.data))
      .catch((err) => setApiError(err));
  }, []);

  const getCapitalizedName = () =>
    user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);

  return (
    <Container className="main">
      <h1 className="hi-title">
        Bienvenido,{" "}
        {user !== null
          ? getCapitalizedName()
          : apiError !== null
          ? "Error!"
          : "..."}{" "}
        <span className="hi-emoji">👋</span>
      </h1>
      <div className="main-list-view">
        <h2 className="my-lists-heading">Mis Listas 📋</h2>
        <div className="my-lists">
          <Row>
            {lists.map((l) => {
              return (
                <Col>
                  <ListCard
                    key={l.id}
                    id={l.id}
                    title={l.title}
                    description={l.description}
                    dateCreated={l.date_created}
                    privacy={l.privacy}
                  />
                </Col>
              );
            })}
            <Col>
              <Button href="/create/list" className="new-list-button">
                Nueva lista
              </Button>
            </Col>
          </Row>
        </div>
        <h2 className="shared-lists-heading">Compartidas conmigo 🙋‍♂️</h2>
        <div className="shared-lists">
          <Row>
            {sharedLists.map((l) => {
              console.log(sharedLists); // TODO: share some lists in backend to my user
              return (
                <Col>
                  <ListCard
                    key={l.id}
                    id={l.id}
                    title={l.title}
                    description={l.description}
                    dateCreated={l.date_created}
                    privacy={l.privacy}
                  />
                </Col>
              );
            })}
            <Col>
              <ListCard
                id="123"
                title="Titulo de Shared (mocked)"
                description="Descripcion de la shared"
                dateCreated="21-05-2021"
                privacy="private"
              />
            </Col>
          </Row>
        </div>
        <h2 className="favourites-heading">Favoritos 🌟</h2>
        <div className="favourite-lists">
          <Row>
            {favouriteLists.map((l) => {
              console.log(favouriteLists); // TODO: add favourite lists to my user
              return (
                <Col>
                  <ListCard
                    key={l.id}
                    id={l.id}
                    title={l.title}
                    description={l.description}
                    dateCreated={l.date_created}
                    privacy={l.privacy}
                  />
                </Col>
              );
            })}
            <Col>
              <ListCard
                id="123"
                title="Titulo de Favorita (mocked)"
                description="Descripcion de la favorita"
                dateCreated="21-05-2021"
                privacy="public"
              />
            </Col>
            <Col>
              <ListCard
                id="1234"
                title="Titulo de Favorita 2 (mocked)"
                description="Descripcion de la favorita 2"
                dateCreated="21-05-2021"
                privacy="public"
              />
            </Col>
            <Col>
              <Button href="/explore" className="search-lists-button">
                Explorar
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Summary;

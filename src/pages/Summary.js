import { useEffect, useState } from "react";
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
                <Col key={l.id} lg={2} md={3} xl={2} xs={6} xxl={2}>
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
            <Col lg={2} md={3} xl={2} xs={6} xxl={2}>
              <Button href="/list/create" className="new-list-button">
                Nueva lista
              </Button>
            </Col>
          </Row>
        </div>
        <h2 className="shared-lists-heading">Compartidas conmigo 🙋‍♂️</h2>
        <div className="shared-lists">
          <Row>
            {sharedLists.map((l) => {
              return (
                <Col key={l.id} lg={2} md={3} xl={2} xs={6} xxl={2}>
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
          </Row>
        </div>
        <h2 className="favourites-heading">Favoritos 🌟</h2>
        <div className="favourite-lists">
          <Row>
            {favouriteLists.map((l) => {
              return (
                <Col key={l.id} lg={2} md={3} xl={2} xs={6} xxl={2}>
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
            <Col lg={2} md={3} xl={2} xs={6} xxl={2}>
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

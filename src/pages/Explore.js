import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import ListCard from "../components/ListCard";
import "./styles/Explore.scss";
import "animate.css";
import ListsRepository from "../services/repositories/ListsRepository";

const Explore = (props) => {
  const [publicLists, setPublicLists] = useState(null);
  const [filteredLists, setFilteredLists] = useState(null);
  const [apiError, setApiError] = useState(null);

  const fetchData = async () => {
    try {
      const publicResult = await ListsRepository.getPublicLists();
      setPublicLists(publicResult);
      setFilteredLists(publicResult);
    } catch (err) {
      setApiError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (e) => {
    let result = publicLists.filter((l) => {
      return l.title.toLowerCase().search(e.target.value.toLowerCase()) != -1;
    });
    if (e.target.value !== "") {
      setFilteredLists(result);
    } else {
      setFilteredLists(publicLists);
    }
  };

  return (
    <Container>
      <div className="explore-heading">
        <Row>
          <Col>
            <h1 className="explore-title">Listas públicas</h1>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                placeholder="Filtrar y buscar"
                size="md"
                onChange={handleFilter}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div className="explore-main">
        <Alert show={apiError} variant="danger">
          Hubo un error al buscar listas públicas.
        </Alert>
        <Row>
          {filteredLists &&
            filteredLists.map((l, i) => {
              return (
                <Col
                  className="animate__animated animate__fadeInLeftBig"
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
            })}
        </Row>
      </div>
    </Container>
  );
};

export default Explore;

import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ListCard from "../components/ListCard";
import axios from "axios";
import RestUtils from "../utils/RestUtils";
import "./styles/Explore.scss";
import { search } from "language-tags";

const Explore = (props) => {
  const [publicLists, setPublicLists] = useState(null);
  const [filteredLists, setFilteredLists] = useState(null);

  useEffect(() => {
    axios
      .get(`${RestUtils.getApiUrl()}/api/lists/search`, RestUtils.getHeaders())
      .then((response) => {
        setPublicLists(response.data);
        setFilteredLists(response.data);
      })
      .catch((err) => console.log(err));
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
      <Row>
        {filteredLists &&
          filteredLists.map((l, i) => {
            return (
              <Col key={l.id} lg={2} md={3} xl={2} xs={6} xxl={2}>
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
    </Container>
  );
};

export default Explore;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Modal,
  Alert,
  Pagination,
} from "react-bootstrap";
import RestUtils from "../utils/RestUtils";
import "./styles/Search.scss";
import ItemSearchCard from "./ItemSearchCard";
import ItemSearchModal from "./ItemSearchModal";
import EmptySearchState from "./EmptySearchState";
import { useLocation, useHistory } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = (props) => {
  const { listId, changeTab } = props;

  let query = useQuery();
  let history = useHistory();

  const [searchString, setSearchString] = useState(
    query.get("q") === null ? "" : query.get("q")
  );

  const [searchResult, setSearchResult] = useState();
  const [showModal, setShowModal] = useState(false);
  const [itemData, setItemData] = useState();
  const [successAddItem, setSuccessAddItem] = useState(false);
  const [errorAddItem, setErrorAddItem] = useState(false);
  const [offset, setOffset] = useState(0);

  const handleShow = (itemId) => {
    getItemData(itemId);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setItemData(null);
  };

  const handleAddToList = (itemId) => {
    axios
      .post(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/items/${itemData.id}`,
        {},
        RestUtils.getHeaders()
      )
      .then((response) => setSuccessAddItem(true))
      .catch((err) => setErrorAddItem(true));
    window.scrollTo(0, 0);
    handleClose();
    setTimeout(() => {
      setSuccessAddItem(false);
      setErrorAddItem(false);
    }, 10000);
  };

  const getItemData = (itemId) => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/items/${itemId}`,
        RestUtils.getHeaders()
      )
      .then((response) => setItemData(response.data))
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  const handleSubmitSearch = () => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/items/search?q=${searchString}&offset=${offset}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        setSearchResult(response.data);
        history.push(`/lists/${listId}?tab=search&q=${searchString}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (searchString !== "") {
      handleSubmitSearch();
    }
  }, [offset]);

  return (
    <div className="search-items">
      <Alert show={successAddItem} variant="success" className="add-alert">
        ¡Producto agregado con éxito!{" "}
        <button className="see-in-list" onClick={() => changeTab("items")}>
          Ver en la lista
        </button>
      </Alert>
      <Alert show={errorAddItem} variant="danger" className="add-alert">
        Oh... Parece que ocurrió un error al agregar este producto a tu lista.
      </Alert>
      <div className="search-items-heading">
        <h3 className="search-items-heading-title">¿Que buscás?</h3>
        <Form.Control
          size="lg"
          className="search-items-input"
          placeholder="Ej. Memoria RAM 32 GB"
          value={searchString}
          onChange={handleSearch}
        />
        <Button
          variant="primary"
          className="search-button"
          size="lg"
          onClick={handleSubmitSearch}
        >
          Buscar
        </Button>
      </div>
      <Container>
        {searchResult && searchResult.paging && (
          <div className="results-found">
            {searchResult.paging.total} resultados encontrados para{" "}
            {`"${searchResult.query}"`}
            <div>
              <Pagination>
                <Pagination.Prev
                  onClick={() => {
                    if (offset > 0) {
                      setOffset(offset - 50);
                    }
                  }}
                >
                  Anterior
                </Pagination.Prev>
                <Pagination.Next
                  onClick={() => {
                    if (offset < 1000) {
                      setOffset(offset + 50);
                    }
                  }}
                >
                  Siguiente
                </Pagination.Next>
              </Pagination>
            </div>
          </div>
        )}
        <Row>
          {searchResult ? (
            searchResult.results.map((item) => {
              return (
                <Col
                  className="animate__animated animate__fadeIn"
                  key={item.id}
                  lg={2}
                  md={3}
                  xl={2}
                  xs={6}
                  xxl={2}
                >
                  <ItemSearchCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    stock={item.vailable_quantity}
                    permalink={item.permalink}
                    thumbnail={item.thumbnail}
                    handleShow={handleShow}
                  />
                </Col>
              );
            })
          ) : (
            <EmptySearchState />
          )}
        </Row>
        {searchResult && (
          <div className="pagination-footer">
            <Pagination>
              <Pagination.Prev
                onClick={() => {
                  if (offset > 0) {
                    setOffset(offset - 50);
                  }
                }}
              >
                Anterior
              </Pagination.Prev>
              <Pagination.Next
                onClick={() => {
                  if (offset < 1000) {
                    setOffset(offset + 50);
                  }
                }}
              >
                Siguiente
              </Pagination.Next>
            </Pagination>
          </div>
        )}
      </Container>
      <Modal
        size="lg"
        show={showModal}
        onHide={handleClose}
        animation={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {itemData !== undefined && itemData !== null ? itemData.title : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ItemSearchModal data={itemData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Salir
          </Button>
          <Button variant="primary" onClick={handleAddToList}>
            Agregar a la lista
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Search;

import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Badge, Row, Col } from "react-bootstrap";
import placeHolder from "../assets/default-placeholder.png";
import { PatchCheck, PatchCheckFill, Trash } from "react-bootstrap-icons";
import "./styles/ItemCard.scss";

const ItemCard = (props) => {
  const {
    id,
    //pictures,
    thumbnail,
    title,
    description,
    price,
    //stock,
    //permalink,
    itemListStatus,
    itemStatus,
    listId,
    handleCheck,
    handleDelete,
    shareType,
    readyToRequest,
  } = props;

  const checkItem = () => {
    if (itemListStatus === "not_checked") {
      handleCheck(id, true);
    } else {
      handleCheck(id, false);
    }
  };

  const deleteItem = () => {
    if (
      window.confirm(
        "¿Estás seguro que deseas borrar este producto de la lista?"
      )
    ) {
      handleDelete(id);
    }
  };

  const getCheckClass = () => {
    return readyToRequest ? "check ready" : "check wait";
  };

  return (
    <div>
      <div className="thumbnail-div">
        <Link to={`/lists/${listId}/${id}`}>
          <img
            className="thumbnail"
            src={itemStatus === "active" ? thumbnail : placeHolder}
            alt={description}
          />
        </Link>
        <Row className="actionable-buttons">
          {(shareType === "admin" ||
            shareType === "write" ||
            shareType === "check") && (
            <Col className={getCheckClass()} onClick={checkItem}>
              {itemListStatus === "checked" ? (
                <PatchCheckFill />
              ) : (
                <PatchCheck />
              )}
            </Col>
          )}
          {(shareType === "admin" || shareType === "write") && (
            <Col className="trash">
              <button onClick={deleteItem}>
                <Trash />
              </button>
            </Col>
          )}
        </Row>
      </div>
      <div className="item-data">
        <span className="item-data-price">
          <NumberFormat
            value={price}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"$"}
          />
        </span>
        <div>
          {itemListStatus === "checked" ? (
            <Badge pill className="pill pill-checked">
              COMPRADO
            </Badge>
          ) : (
            itemStatus !== "active" && (
              <Badge pill className="pill pill-not-active">
                NO DISPONIBLE
              </Badge>
            )
          )}
        </div>
        <p className="item-data-title">{title}</p>
      </div>
    </div>
  );
};

export default ItemCard;

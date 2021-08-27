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
  } = props;

  const getFormattedText = (text) => {
    return itemListStatus === "checked"
      ? text
          .split("")
          .map((char) => char + "\u0336")
          .join("")
      : text;
  };

  const checkItem = () => {
    if (itemListStatus === "not_checked") {
      if (window.confirm("¿Marcar el producto como comprado?")) {
        handleCheck(id, true);
      }
    } else {
      if (
        window.confirm(
          "Este producto está marcado como comprado, ¿Estás seguro que deseas marcarlo como no comprado?"
        )
      ) {
        handleCheck(id, false);
      }
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

  return (
    <div>
      <Row>
        {(shareType === "admin" ||
          shareType === "write" ||
          shareType === "check") && (
          <Col className="check">
            <button onClick={checkItem}>
              {itemListStatus === "checked" ? (
                <PatchCheckFill />
              ) : (
                <PatchCheck />
              )}
            </button>
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
      <Link to={`/lists/${listId}/${id}`}>
        <div className="thumbnail-div">
          <img
            className="thumbnail"
            src={itemStatus === "active" ? thumbnail : placeHolder}
            alt={description}
          />
        </div>
      </Link>
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
        <p>
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
        </p>
        <p className="item-data-title">{title}</p>
      </div>
    </div>
  );
};

export default ItemCard;

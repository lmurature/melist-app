import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Badge } from "react-bootstrap";
import "./styles/ItemCard.css";

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
    listId,
  } = props;

  const getFormattedText = (text) => {
    return itemListStatus === "checked"
      ? text
          .split("")
          .map((char) => char + "\u0336")
          .join("")
      : text;
  };

  return (
    <div>
      <Link to={`/lists/${listId}/${id}`}>
        <div className="thumbnail-div">
          <img className="thumbnail" src={thumbnail} alt={description} />
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
        <p className="item-data-title">{getFormattedText(title)} </p>
        <p>
          {itemListStatus === "checked" ? (
            <Badge pill className="checked-pill">
              COMPRADO
            </Badge>
          ) : (
            ""
          )}{" "}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;

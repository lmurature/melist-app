import React from "react";
import NumberFormat from "react-number-format";
import "./styles/ItemSearchCard.css";

const ItemSearchCard = (props) => {
  const { id, title, description, price, stock, permalink, thumbnail, handleShow } = props;

  const handleClick = () => {
    handleShow(id);
  }

  return (
    <div>
      <button onClick={handleClick}>
        <div className="thumbnail-div">
          <img className="thumbnail" src={thumbnail} alt={description} />
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
          <p className="item-data-title">{title}</p>
        </div>
      </button>
    </div>
  );
};

export default ItemSearchCard;

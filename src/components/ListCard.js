import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import "./ListCard.css"

function ListCard(props) {

  return (
    <Link to={`/lists/${props.id}`} className="link-to-list">
      <div className="list-card unselectable" title={props.description}>
        <h1 className="list-title">{props.title}</h1>
      </div>
    </Link>
  );
}

export default ListCard;

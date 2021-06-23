import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import "./styles/ListCard.css";
import React from "react";

const ListCard = (props) => {
  return (
    <React.Fragment>
      <Link to={`/lists/${props.id}`} className="link-to-list">
        <div className="list-card unselectable" title={props.description}>
          <h1 className="list-title">{props.title}</h1>
        </div>
      </Link>
      <div className="list-privacy unselectable">
        Lista {props.privacy === "private" ? " Privada 🔐" : " Pública 🌍"}
      </div>
    </React.Fragment>
  );
}

export default ListCard;

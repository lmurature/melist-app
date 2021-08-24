import { Link } from "react-router-dom";
import "./styles/ListCard.scss";
import "./PrivacyLabel";
import React from "react";
import PrivacyLabel from "./PrivacyLabel";

const ListCard = (props) => {
  let classes = [
    "list-card-purple",
    "list-card-red",
    "list-card-green",
    "list-card-brown",
    "list-card-blue",
    "list-card-pink",
    "list-card-orange",
  ];

  const getRandomClass = () => {
    let rng = parseInt(Math.random() * (classes.length - 1 - 0) + 0); // rand[0,8)
    return `list-card unselectable ${classes[rng]}`;
  };

  return (
    <React.Fragment>
      <Link to={`/lists/${props.id}`} className="link-to-list">
        <div className={getRandomClass()} title={props.description}>
          <h1 className="list-title">{props.title}</h1>
        </div>
      </Link>
      <PrivacyLabel privacy={props.privacy} centered={true} />
    </React.Fragment>
  );
};

export default ListCard;

import { Link } from "react-router-dom";
import "./styles/ListCard.css";
import "./PrivacyLabel";
import React from "react";
import PrivacyLabel from "./PrivacyLabel";

const ListCard = (props) => {
  return (
    <React.Fragment>
      <Link to={`/lists/${props.id}`} className="link-to-list">
        <div className="list-card unselectable" title={props.description}>
          <h1 className="list-title">{props.title}</h1>
        </div>
      </Link>
      <PrivacyLabel privacy={props.privacy} centered={true} />
    </React.Fragment>
  );
};

export default ListCard;

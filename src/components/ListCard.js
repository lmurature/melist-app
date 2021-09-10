import { Link } from "react-router-dom";
import "./styles/ListCard.scss";
import "./PrivacyLabel";
import React from "react";
import PrivacyLabel from "./PrivacyLabel";
import store from "store";

const ListCard = (props) => {
  let classes = [
    "list-card-purple",
    "list-card-green",
    "list-card-brown",
    "list-card-blue",
    "list-card-pink",
    "list-card-orange",
  ];

  const getRandomClass = () => {
    return `list-card unselectable ${classes[parseInt(props.index + 3) % 6]}`;
  };

  const getNumberOfUnreadNotifications = () => {
    if (store.get(`notifications-${props.id}`) && props.notifications) {
      let unread = props.notifications - store.get(`notifications-${props.id}`);
      return unread === 0 ? "" : `(${unread})`;
    }
  };

  return (
    <React.Fragment>
      <Link to={`/lists/${props.id}`} className="link-to-list">
        <div className={getRandomClass()} title={props.description}>
          <h1 className="list-title">
            {props.title} {getNumberOfUnreadNotifications()}
          </h1>
        </div>
      </Link>
      <PrivacyLabel privacy={props.privacy} centered={true} />
    </React.Fragment>
  );
};

export default ListCard;

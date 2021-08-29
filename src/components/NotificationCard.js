import moment from "moment";
import "moment/locale/es";
import { Card } from "react-bootstrap";
import { Dot } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./styles/NotificationCard.scss";

const NotificationCard = (props) => {
  const { message, seen, permalink, timestamp, index } = props;

  let classes = [
    "notification-background-dark",
    "notification-background-light",
  ];

  const getTimeAgo = () => {
    return moment(timestamp).locale("es").subtract(3, "hours").fromNow(); // convert to UTC-3
  };

  const getClass = () => {
    return `${classes[parseInt(index) % 2]}`;
  };

  return (
    <Card body className={getClass()}>
      <Dot className="unseen-dot" />
      {message}{" "}
      <Link to={permalink}>Ver detalle</Link>
      <span className="time-ago">{" " + getTimeAgo()}</span>
    </Card>
  );
};

export default NotificationCard;

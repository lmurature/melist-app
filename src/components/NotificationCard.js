import moment from "moment";
import "moment/locale/es";
import { Card } from "react-bootstrap";
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
      <Link to={permalink}>{message}</Link>
      {" " + getTimeAgo()}
    </Card>
  );
};

export default NotificationCard;

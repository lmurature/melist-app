import { Container } from "react-bootstrap";
import NotificationCard from "./NotificationCard";
import "./styles/Notifications.scss";

const Notifications = (props) => {
  const { listNotifications, unread } = props;

  const isSeen = (index) => {
    console.log(index, unread, index < unread);
    return index >= unread;
  };

  return (
    <Container className="notifications-root">
      {listNotifications &&
        listNotifications.map((n, i) => {
          return (
            <NotificationCard
              key={i}
              message={n.message}
              seen={isSeen(i)}
              timestamp={n.timestamp}
              permalink={n.permalink}
            />
          );
        })}
    </Container>
  );
};

export default Notifications;

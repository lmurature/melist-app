import { Container } from "react-bootstrap";
import NotificationCard from "./NotificationCard";
import "./styles/Notifications.scss";

const Notifications = (props) => {
  const { listNotifications } = props;

  return (
    <Container className="notifications-root">
      {listNotifications &&
        listNotifications.map((n, i) => {
          return (
            <NotificationCard
              key={i}
              message={n.message}
              index={i}
              seen={n.seen}
              timestamp={n.timestamp}
              permalink={n.permalink}
            />
          );
        })}
    </Container>
  );
};

export default Notifications;

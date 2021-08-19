import react from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";

const ViewItemPage = () => {
  const { listId, itemId } = useParams();

  return (
    <Container>
      VIP {listId} {itemId}
    </Container>
  );
};

export default ViewItemPage;

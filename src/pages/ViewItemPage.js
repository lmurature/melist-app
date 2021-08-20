import axios from "axios";
import react, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import RestUtils from "../utils/RestUtils";

const ViewItemPage = () => {
  const { listId, itemId } = useParams();

  const [itemData, setItemData] = useState(null);

  const [itemHistory, setItemHistory] = useState(null); // TODO: add endpoint + apicall 

  useEffect(() => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/items/${itemId}`,
        RestUtils.getHeaders()
      )
      .then((response) => setItemData(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      VIP {listId} {itemId} {JSON.stringify(itemData)}
    </Container>
  );
};

export default ViewItemPage;

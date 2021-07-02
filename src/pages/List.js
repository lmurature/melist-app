import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestUtils from "../utils/RestUtils";
import axios from "axios";

const List = () => {
  const { listId } = useParams();

  const [list, setList] = useState(null);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}`,
        RestUtils.getHeaders()
      )
      .then((response) => setList(response.data))
      .catch((err) => console.log(err));

    axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/items?info=true`,
        RestUtils.getHeaders()
      )
      .then((response) => setListItems(response.data))
      .catch((err) => console.log(err));
  }, [listId]);

  return <div>{JSON.stringify(list)}{JSON.stringify(listItems)}</div>;
};

export default List;

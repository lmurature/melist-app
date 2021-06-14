import react, { useEffect, useState } from "react";
import RestUtils from "../utils/RestUtils";
import Header from '../components/Header';
import axios from 'axios';

function Summary(props) {

  const [user, setUser] = useState(null);
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    axios.get(
      `${RestUtils.getApiUrl()}/api/users/me`,
      RestUtils.getHeaders())
      .then(response => setUser(response.data))
      .catch(err => setApiError(err));
  }, [])

  return(
    <div>
      <Header />
      Summary! {user !== null ? 'Hi ' + user.first_name : apiError !== null ? 'Error!' : '...'}
    </div>
  );
}

export default Summary;
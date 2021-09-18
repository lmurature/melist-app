import React, { useEffect, useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import UsersService from "../services/UsersService";
import RestUtils from "../utils/RestUtils";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Authorized = (props) => {
  let query = useQuery();

  const [token, setToken] = useState(null);
  const [err, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [access_token] = await UsersService.generateToken(
        query.get("code")
      );
      setToken(access_token);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const retryLink = () => {
    return (
      <div>
        There was an error trying to authenticate with Mercado Libre
        <a href={RestUtils.getAuthUrl()}>
          Try again
        </a>
      </div>
    );
  };

  return (
    <div>
      {token == null && err == null ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : err != null ? (
        retryLink()
      ) : (
        <Redirect to="/summary" />
      )}
    </div>
  );
};

export default Authorized;

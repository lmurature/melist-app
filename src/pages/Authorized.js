import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import UsersService from '../services/UsersService';
import RestUtils from '../utils/RestUtils';
import store from 'store';

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
        query.get('code')
      );
      setToken(access_token);
    } catch (err) {
      setError(err);
    }
  };

  const redirect = () => {
    const path = store.get('path-to-redirect');
    store.set('path-to-redirect', null);
    window.location.pathname = path ? path : '/summary';
  };

  useEffect(() => {
    fetchData();
  });

  const retryLink = () => {
    return (
      <div>
        There was an error trying to authenticate with Mercado Libre
        <a href={RestUtils.getAuthUrl()}>Try again</a>
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
        redirect()
      )}
    </div>
  );
};

export default Authorized;

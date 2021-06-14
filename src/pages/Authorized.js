import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import RestUtils from '../utils/RestUtils';
import store from 'store';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Authorized(props) {
  let query = useQuery();

  const [token, setToken] = useState(null);
  const [err, setError] = useState(null);

  useEffect(() => {
    axios.post(`${RestUtils.getApiUrl()}/api/users/auth/generate_token`, {
      authorization_code: query.get('code'),
    }).then(res => {
      store.set('access-token', res.data)
      setToken(res.data)
    }).catch(err => {
      setError(err);
    })
  }, []);

  const retryLink = () => {
    return (
      <div>
          There was an error trying to authenticate with Mercado Libre
        <a href='https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=5112680121711673&redirect_uri=http://localhost:3000/auth/authorized'>
          Try again
        </a>
      </div>);
  };


  return (<div>
    {
      token == null && err == null ? 'Loading...'
        : err != null ? retryLink()
          : 
          <div>
            Has ingresado correctamente, ¿Listo para empezar?
            <button>
            <a href="/summary">
              Empezar!
            </a>
          </button>
          </div>
          }
  </div>);
}

export default Authorized;

import React, { useState, useEffect } from "react";
import store from 'store';
import axios from 'axios';
import Logo from '../assets/Frame.png';
import RestUtils from "../utils/RestUtils";

function Header() {

  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({first_name: '', last_name: ''})

  useEffect(() => {
    let auth = store.get('access-token')
    if(auth) {
      setAuthenticated(true)
      axios.get(`${RestUtils.getApiUrl()}/api/users/me`, RestUtils.getHeaders())
      .then(response => setUser(response.data))
      .catch(err => console.log(err));
    } else {
      setAuthenticated(false)
    }
  }, [authenticated]);

  const getCapitalizedName = () => user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
  
  const authenticatedUserComponent = () => { // could be a dropdown menu with a few options. Profile, notifications, Logout.
    return (
      <React.Fragment>
        <div className="row user">
          { /* <img src={Avatar} width="30rem"/> */ }
              {getCapitalizedName()}
        </div>
        <a href="/" className="button" onClick={() => store.remove('access-token')}>
          Cerrar sesión
        </a>
      </React.Fragment>
    );
  };

  
  const logInComponent = () => {
    return (
      <a href={RestUtils.getAuthUrl()}>
        Iniciar Sesión
      </a>
    );
  }
  return (
    <nav class="header">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src={Logo} alt="ME List" width="25rem" height="25rem" class="d-inline-block align-text-top header-logo"/>
            ME List
        </a>
      </div>
        <div className="header-user d-flex">
        {authenticated ? authenticatedUserComponent() : logInComponent()}
      </div>
</nav>
  )
}

export default Header;
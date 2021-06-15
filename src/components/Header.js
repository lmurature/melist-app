import React, { useState, useEffect } from "react";
import store from 'store';
import axios from 'axios';
import Logo from '../assets/Frame.png';
import RestUtils from "../utils/RestUtils";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Header.css';

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
  
  return (
  <Navbar class="navbar" sticky="top">
      <Navbar.Brand href="/" class="text-white">
        <img src={Logo} alt="ME List" width="30" height="30" class="d-inline-block align-text-top"/>  
        {' '}ME List
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      {authenticated ? <Nav className="ml-auto">
         <NavDropdown alignRight title={getCapitalizedName()} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/" onClick={() => store.remove('access-token')}> Cerrar sesión </NavDropdown.Item>
        </NavDropdown> 
      </Nav> : 
      <Nav className="ml-auto">
      <Nav.Link href={RestUtils.getAuthUrl()}>
        Iniciar sesión
      </Nav.Link>
        </Nav>}
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Header;
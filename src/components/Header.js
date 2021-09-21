import React, { useState, useEffect } from "react";
import store from "store";
import Logo from "../assets/Frame.png";
import RestUtils from "../utils/RestUtils";
import { Navbar, Nav, NavDropdown, Container, Button, Alert } from "react-bootstrap";
import Cookies from "universal-cookie";
import "./styles/Header.scss";
import { Link } from "react-router-dom";
import UsersRepository from "../services/repositories/UsersRepository";

function Header() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [nightMode, setNightMode] = useState(false);
  const [apiError, setApiError] = useState(null);

  const fetchData = async () => {
    try {
      const [first, last] = await UsersRepository.getUser();
      setUser({ first_name: first, last_name: last });
    } catch (err) {
      setApiError(err);
    }
  };

  useEffect(() => {
    if (store.get("nightmode")) {
      setNightMode(true);
    }

    let auth = store.get("access-token");
    if (auth) {
      setAuthenticated(true);
      fetchData();
    } else {
      setAuthenticated(false);
    }
  }, []);

  const getCapitalizedName = () =>
    user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);

  return (
    <Navbar className="navbar" sticky="top">
      <Container>
        <Link to="/summary">
          <Navbar.Brand className="text-white">
            <img
              src={Logo}
              alt="ME List"
              width="30"
              height="30"
              className="logo"
            />{" "}
            <span className="title">ME List</span>
          </Navbar.Brand>
        </Link>
        <Alert show={apiError} variant="danger">
          Hubo un error al conectar con el servidor
        </Alert>
        <Navbar.Collapse id="basic-navbar-nav">
          {authenticated ? (
            <Nav className="ml-auto">
              <Link className="add-list-header" to="/summary">
                <Button className="add-list-header">Inicio</Button>
              </Link>

              <Link className="add-list-header" to="/list/create">
                <Button className="add-list-header">Crear lista</Button>
              </Link>
              <Link className="add-list-header" to="/explore" Explorar>
                <Button className="add-list-header">Explorar</Button>
              </Link>
              <NavDropdown alignRight title={"Menú"} id="basic-nav-dropdown">
                <NavDropdown.Header className="dropdown-header">
                  {getCapitalizedName()}
                </NavDropdown.Header>
                <NavDropdown.Item
                  onClick={() => {
                    if (nightMode) {
                      store.set("nightmode", false);
                    } else {
                      store.set("nightmode", true);
                    }
                    window.location.reload();
                  }}
                >
                  {nightMode ? "Modo día ☀️" : "Modo noche 🌙"}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="/"
                  onClick={() => {
                    store.remove("access-token");
                    const cookies = new Cookies();
                    cookies.remove("refresh-token", { path: "/summary" });
                  }}
                >
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link href={RestUtils.getAuthUrl()}>
                <span className="login">Ingresar con Mercado Libre</span>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

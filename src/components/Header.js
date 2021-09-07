import React, { useState, useEffect } from "react";
import store from "store";
import axios from "axios";
import Logo from "../assets/Frame.png";
import RestUtils from "../utils/RestUtils";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./styles/Header.scss";

function Header() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    if (store.get("nightmode")) {
      setNightMode(true);
    }

    let auth = store.get("access-token");
    if (auth) {
      setAuthenticated(true);
      axios
        .get(`${RestUtils.getApiUrl()}/api/users/me`, RestUtils.getHeaders())
        .then((response) => setUser(response.data))
        .catch((err) => {
          if (err.response && err.response.status === 403) {
            axios
              .post(`${RestUtils.getApiUrl()}/api/users/auth/refresh_token`, {
                refresh_token: auth.refresh_token,
              })
              .then((response) => {
                store.set("access-token", response.data);
                axios
                  .get(
                    `${RestUtils.getApiUrl()}/api/users/me`,
                    RestUtils.getHeaders()
                  )
                  .then((response) => setUser(response.data))
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        });
    } else {
      setAuthenticated(false);
    }
  }, []);

  const getCapitalizedName = () =>
    user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);

  return (
    <Navbar className="navbar" sticky="top">
      <Container>
        <Navbar.Brand href="/summary" className="text-white">
          <img
            src={Logo}
            alt="ME List"
            width="30"
            height="30"
            className="logo"
          />{" "}
          <span className="title">ME List</span>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          {authenticated ? (
            <Nav className="ml-auto">
              <NavDropdown
                alignRight
                className="navbar-dropdown"
                title={getCapitalizedName()}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/summary">Inicio</NavDropdown.Item>
                <NavDropdown.Item href="/explore">Explorar</NavDropdown.Item>
                <NavDropdown.Item
                  href="/summary"
                  onClick={() => {
                    if (nightMode) {
                      store.set("nightmode", false);
                    } else {
                      store.set("nightmode", true);
                    }
                  }}
                >
                {nightMode ? "Modo normal" : "Modo oscuro"}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="/"
                  onClick={() => store.remove("access-token")}
                >
                  {" "}
                  Cerrar sesión{" "}
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

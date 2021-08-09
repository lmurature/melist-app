import store from "store";
import React, { useEffect, useState } from "react";
import RestUtils from "../utils/RestUtils";
import Regalo from "../assets/regalo.png";
import { Redirect } from "react-router";

const Home = (props) => {
  const [startUrl, setStartUrl] = useState(RestUtils.getAuthUrl());

  useEffect(() => {
    let auth = store.get("access-token");
    if (auth) {
      setStartUrl("/summary");
    }
  }, []);

  const isAuthenticated = () => {
    return store.get("access-token") !== undefined;
  };

  return (
    <div>
      {isAuthenticated() ? <Redirect to="/summary" /> : ""}
      <div className="main-div">
        <div className="info-main container">
          <p className="info-title">
            Tus necesidades y deseos, ahora colaborativos 💛
          </p>
          <a className="start-button" href={startUrl}>
            <div className="start-div">Comenzar</div>
          </a>
        </div>
        <div className="gift">
          <img src={Regalo} alt="regalo"/>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Authorized from "./pages/Authorized";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import Header from "./components/Header";
import Footer from './components/Footer';
import "./App.css";

const App = ({ location }) => (
  <React.Fragment>
      {location.pathname !== "/auth/authorized" && <Header/>}
      <Route exact path="/" component={Home} />
      <Route path="/summary" component={Summary} />
      <Route path="/auth/authorized" component={Authorized} />
      <Footer/>
  </React.Fragment>
);

export default withRouter(App);

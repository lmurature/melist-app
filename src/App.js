import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import Authorized from "./pages/Authorized";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import CreateList from "./pages/CreateList";
import List from "./pages/List";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ViewItemPage from "./pages/ViewItemPage";
import Explore from "./pages/Explore";
import store from "store";
import "./App.scss";

const App = ({ location }) => (
  <div
    className={
      store.get("nightmode")
        ? "app theme theme--dark"
        : "app theme theme--light"
    }
  >
    {location.pathname !== "/auth/authorized" && <Header />}
    <Route exact path="/" component={Home} />
    <Route path="/summary" component={Summary} />
    <Route path="/auth/authorized" component={Authorized} />
    <Route path="/list/create" component={CreateList} />
    <Route exact path="/lists/:listId" component={List} />
    <Route exact path="/lists/:listId/:itemId" component={ViewItemPage} />
    <Route exact path="/explore" component={Explore} />
    <Footer />
  </div>
);

export default withRouter(App);

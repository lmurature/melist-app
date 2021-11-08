import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Authorized from './pages/Authorized';
import Home from './pages/Home';
import Summary from './pages/Summary';
import CreateList from './pages/CreateList';
import List from './pages/List';
import Header from './components/Header';
import Footer from './components/Footer';
import ViewItemPage from './pages/ViewItemPage';
import Explore from './pages/Explore';
import store from 'store';
import './App.scss';
import UsersRepository from './services/repositories/UsersRepository';
import { Button, Container, Spinner } from 'react-bootstrap';
import Reviews from './pages/Reviews';
import RestUtils from './utils/RestUtils';

const App = ({ location }) => {
  const [apiError, setApiError] = useState(null);
  const [readyToRender, setReadyToRender] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const fetchRefreshToken = async (token) => {
    try {
      await UsersRepository.refreshToken(token);
      setAuthenticated(true);
      setReadyToRender(true);
    } catch (err) {
      setApiError(err);
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    const sessionInfo = store.get('access-token');
    if (sessionInfo) {
      fetchRefreshToken(sessionInfo.refresh_token);
    } else {
      setAuthenticated(false);
      setReadyToRender(true);
    }
  }, []);

  return readyToRender ? (
    <div
      className={
        store.get('nightmode')
          ? 'app theme theme--dark'
          : 'app theme theme--light'
      }
    >
      {location.pathname !== '/auth/authorized' && <Header />}
      <Route exact path="/" component={Home} />
      <Route path="/auth/authorized" component={Authorized} />
      {authenticated ? (
        <React.Fragment>
          <Route path="/summary" component={Summary} />
          <Route path="/list/create" component={CreateList} />
          <Route exact path="/lists/:listId" component={List} />
          <Route exact path="/lists/:listId/:itemId" component={ViewItemPage} />
          <Route exact path="/explore" component={Explore} />
          <Route
            exact
            path="/lists/:listId/:itemId/reviews"
            component={Reviews}
          />
        </React.Fragment>
      ) : (
        <Container className="login-to-see">
          <div className="login-to-see-greet">
            <span className="login-to-see-hi">Hola!</span>
            <div>Parece que no iniciaste sesión en Melist...</div>
          </div>
          <div>
            Para ver esta página tenés que loguearte con tu cuenta de
            Mercadolibre
          </div>
          <Button className="login-to-see-back">
            <Link to="/">
              <span className="login-to-see-button">Volver al inicio</span>
            </Link>
          </Button>
          <Button className="new-list-button">
            <a
              href={RestUtils.getAuthUrl()}
              onClick={() => {
                store.set('path-to-redirect', window.location.pathname);
              }}
            >
              <span className="login-to-see-button">Iniciar sesión</span>
            </a>
          </Button>
        </Container>
      )}

      <Footer />
    </div>
  ) : (
    <div className="loading">
      <Spinner animation="border" />
    </div>
  );
};

export default withRouter(App);

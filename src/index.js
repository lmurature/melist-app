import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Authorized from './pages/Authorized';
import Home from './pages/Home';
import Summary from './pages/Summary';
import reportWebVitals from './reportWebVitals'


ReactDOM.render(
    <Router>
        <Route exact path="/" component={Home} />
        <Route path="/auth/authorized" component={Authorized} />
        <Route path="/summary" component={Summary}/>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

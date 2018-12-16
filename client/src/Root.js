import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';

import App from './components/containers/App'
import LoginForm from './components/forms/LoginForm'

const Root = ({ store }) => {

    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/login" component={LoginForm} />
          </React.Fragment>
        </Router>
      </Provider>
    )
}

export default Root;

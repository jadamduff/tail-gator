import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';

import App from './components/containers/App'
import LoginForm from './components/forms/LoginForm'
import AllOrdersContainer from './components/containers/AllOrdersContainer'

const Root = ({ store }) => {

    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/login" component={LoginForm} />
            <Route path="/all_orders" component={AllOrdersContainer} />
          </React.Fragment>
        </Router>
      </Provider>
    )
}

export default Root;

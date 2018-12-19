import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialAuth } from '../../actions/users'
import { getProducts } from '../../actions/products'
import './App.css';

import AppHeader from '../headers/AppHeader'
import Dashboard from './Dashboard'
import SignupForm from '../forms/SignupForm'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initialAuth();
    this.props.getProducts();
  }

  renderComponents() {
    if (this.props.loggedIn) {
      return <Dashboard />
    } else {
      return <SignupForm />
    }
  }

  render() {
    return (
        <div className="App">
          <AppHeader loggedIn={this.props.loggedIn}/>
          {this.props.loggedIn ? <Dashboard /> : <SignupForm />}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.user.isAuthenticated)
  return {
    loggedIn: state.user.loggedIn
  }
}

export default connect(mapStateToProps, { initialAuth, getProducts })(App);

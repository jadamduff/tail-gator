import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.css';

import { logout } from '../../actions/users'

class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderLink() {
    console.log('loggedIn: ', this.props.loggedIn)
    if (this.props.loggedIn) {
      return (
        <span className="header-link-text" onClick={this.props.logout}>LOGOUT</span>
      )
    } else {
      return (
        <Link to="/login" className="header-link-text">LOGIN</Link>
      )
    }
  }

  componentDidMount() {
    console.log('mounted logged in: ', this.props.loggedIn)
  }

  render() {
    return (
      <div className="App-header">
        <div className="header-container">
          <img src={require('../../images/TailGator_logo3.png')} className="header-logo-image"/>
          <div className="header-logo-text">
            TAILGATOR
          </div>
          <div className="header-link">
            {this.renderLink()}
          </div>
        </div>
      </div>
    )
  }
}


export default connect(null, { logout })(AppHeader);

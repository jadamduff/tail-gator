import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../../actions/users'
import './dashboard.css'

import CSSTransition from 'react-transition-group/CSSTransition';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [1]
    }
  }

  buttonClick = () => {
    this.props.logout();
  }

  render() {
    return (
      <div>
        Name: {this.props.user.name} Email: {this.props.user.email}
        <button onClick={this.buttonClick}>Logout</button>
        <CSSTransition
          appear={true}
          in={true}
          timeout={300}
          classNames="block">
          <div className="block"></div>
        </CSSTransition>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logout })(Dashboard);

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../../actions/users'

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  buttonClick = () => {
    this.props.logout();
  }

  render() {
    return (
      <div>
        Name: {this.props.user.name} Email: {this.props.user.email}
        <button onClick={this.buttonClick}>Logout</button>
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

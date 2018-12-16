import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkAuth, login } from '../../actions/users'
import './forms.css'

import AppHeader from '../headers/AppHeader'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }
  

  loadFlash = () => {
    if (this.props.loginFlash) {
      return (
        <div>
          {this.props.loginFlash}
        </div>
      )
    } else {
      return null
    }
  }

  renderOrRedirect = (email, password) => {
    if (this.props.loggedIn) {
      return (
        <React.Fragment>
          <Redirect to='/' />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <AppHeader />
          <div className="form_box_md_container">
            {this.loadFlash()}
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <div className="form_box_md">
                <div>
                  <label>Email</label>
                </div>
                <input type="text" name="email" className="form_box_md_input_text" onChange={this.handleChange} value={email}/>
                <div>
                  <label>Password</label>
                </div>
                <input type="password" name="password" className="form_box_md_input_text" onChange={this.handleChange} value={password}/>
              </div>
              <input type="submit" className="form_full_btn" value="Login" />
            </form>
          </div>
        </React.Fragment>
      )
    }
  }

  render() {

    const { email, password } = this.state;

    return (
      <div>
        {this.renderOrRedirect(email, password)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    loginFlash: state.user.loginFlash
  }
}

export default connect(mapStateToProps, { checkAuth, login })(LoginForm);

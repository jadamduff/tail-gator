import React, { Component } from 'react';
import { getTestData } from '../../actions/test';
import { createUser } from '../../actions/users';
import { connect } from 'react-redux';
import './forms.css'

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
    this.props.createUser(this.state.name, this.state.email, this.state.password);
    this.setState({
      name: '',
      email: '',
      password: ''
    })
  }

  render() {
    const { name, email, password } = this.state;

    return (
      <div className="form_box_md_container">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className="form_box_md">
            <div>
              <label>Name</label>
            </div>
            <input type="text" name="name" className="form_box_md_input_text" onChange={this.handleChange} value={name}/>
            <div>
              <label>Email</label>
            </div>
            <input type="text" name="email" className="form_box_md_input_text" onChange={this.handleChange} value={email}/>
            <div>
              <label>Password</label>
            </div>
            <input type="password" name="password" className="form_box_md_input_text" onChange={this.handleChange} value={password}/>
          </div>
          <input type="submit" className="form_full_btn" value="Sign Up" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    id: state.user.id,
    name: state.user.name,
    email: state.user.email
  }
}

export default connect(mapStateToProps, { getTestData, createUser })(SignupForm);

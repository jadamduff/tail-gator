import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkAuth, login } from '../../actions/users'
import './forms.css'
import './quantity_form.css'

class QuantityForm extends Component {
  constructor() {
    super();
    this.state ={
      quantity: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <form className="inline-form">
        <input type="text" name="quantity" value={this.state.quantity} maxLength="1" onChange={(event) => this.handleChange(event)} />
        <input type="submit" className="blue-round-button" value="Add" />
      </form>
    )
  }
}

export default connect()(QuantityForm)

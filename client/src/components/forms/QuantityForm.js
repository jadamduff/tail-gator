import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createOrder, addListItemToOrder } from '../../actions/orders'
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
    if ((!isNaN(event.target.value) && parseInt(event.target.value) > 0 && event.target.value.indexOf('.') === -1) || event.target.value === '') {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.props.activeOrderExists) {
      if (this.props.createOrder(this.props.userId, this.props.productId, parseInt(this.state.quantity))) {
        this.props.closeDrawer();
      }
    } else {
      if (this.props.addListItemToOrder(this.props.activeOrderId, this.props.productId, parseInt(this.state.quantity)))
      this.props.closeDrawer();
    }
  }

  render() {
    return (
      <form className="inline-form" onSubmit={(event) => this.handleSubmit(event)}>
        <input type="text" name="quantity" value={this.state.quantity} maxLength="2" autoFocus={true} onChange={(event) => this.handleChange(event)} />
        <input type="submit" className="blue-round-button" value="Add" />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeOrderExists: state.order.activeOrderExists,
    activeOrderId: state.order.order.id,
    userId: state.user.id,
    productId: state.products.selectedProduct.id
  }
}

export default connect(mapStateToProps, { createOrder, addListItemToOrder })(QuantityForm)

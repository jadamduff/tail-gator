import React, { Component } from 'react'
import { connect } from 'react-redux';

import { updateOrderStatus } from '../../actions/orders'

import PaymentForm from '../forms/PaymentForm'

import '../ui/ui.css'
import '../order/order.css'

class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.dropinBtn = React.createRef();
  }

  render() {
    return (
        <div className="screen-container fade-in-fast">
          <div className="screen-dark"></div>
          <div className="active-order-payment-container">
            Payment
            <PaymentForm orderId={this.props.orderId} orderTotal={this.props.orderTotal.toString()} button={this.dropinBtn} updateStatus={this.props.updateOrderStatus}/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.user.id,
    clientToken: state.order.braintreeClientToken,
    orderId: state.order.order.id,
    orderTotal: state.order.order.total
  }
}

export default connect(mapStateToProps, { updateOrderStatus })(PaymentContainer)

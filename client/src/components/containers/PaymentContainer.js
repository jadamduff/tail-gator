import React, { Component } from 'react'
import { connect } from 'react-redux';

import '../ui/ui.css'
import '../order/order.css'

class PaymentContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="screen-container fade-in-fast">
          <div className="screen-dark"></div>
          <div className="active-order-payment-container">
            <div className="active-order-payment-formbox"></div>
          </div>
        </div>
    )
  }
}

export default connect()(PaymentContainer)

import React from "react";
import DropIn from "braintree-web-drop-in-react";

import './forms.css'

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientToken: null,
      orderTotal: this.props.orderTotal
    }
  }

  componentDidMount = () => {
    var dropin = require('braintree-web-drop-in');
    var total = '40.00'
    var button = document.querySelector('#dropin-submit-btn');

    // Get a client token for authorization from your server
    fetch("/api/v1/braintree_client_token")
    .then(response => response.json())
    .then(token => {
      console.log(token)
      this.setState({
        clientToken: token.client_token
      });
        console.log('Order Total State :', this.state.orderTotal)
        dropin.create({
          authorization: this.state.clientToken,
          container: '#dropin-container'
        }, (createErr, instance, total = this.state.orderTotal, updateStatus = this.props.updateStatus, orderId = this.props.orderId) => {
          button.addEventListener('click', (event) => {
            instance.requestPaymentMethod((err, payload) => {
              if (err) {
                console.log('Payment error: ', err)
              }
              console.log('BINGO: ', total)
              fetch('/api/v1/transactions',
                {
                  method: 'post',
                  headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({payment_method_nonce: payload.nonce, amount: total})
                }
              )
              .then(response => response.json())
              .then(resp => {
                if (resp.status === 'Paid') {
                  console.log('Paid')
                  updateStatus(orderId, 'Paid')
                } else {
                  console.log('Failed')
                }
              });
            });
          });
        });

    });
  }

  renderDropin = () => {
    if (!this.state.clientToken) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return (
          <React.Fragment>
            <div id="dropin-container">
            </div>
          </React.Fragment>
        );
    }
  }

    render() {
        return (
          <React.Fragment>
            {this.renderDropin()}
            <div className="blue-round-button" id="dropin-submit-btn">Submit</div>
          </React.Fragment>
        )
    }
}

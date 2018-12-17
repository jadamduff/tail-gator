import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../../actions/users'
import { cancelSelectProduct } from '../../actions/products'
import './dashboard.css'

import WelcomeMessage from '../ui/WelcomeMessage'
import ProductsListContainer from './ProductsListContainer';
import Screen from '../ui/Screen'
import QuantityCheck from '../products/QuantityCheck'

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
        <div className="dashboard-container">
          <WelcomeMessage name={this.props.user.name} />
          <ProductsListContainer />
          {this.props.productSelected && <QuantityCheck pluralizedText={this.props.selectedProductPluralized} cancelSelectProduct={this.props.cancelSelectProduct}/>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    productSelected: state.products.productSelected,
    selectedProductPluralized: state.products.selectedProductPluralized
  }
}

export default connect(mapStateToProps, { logout, cancelSelectProduct })(Dashboard);

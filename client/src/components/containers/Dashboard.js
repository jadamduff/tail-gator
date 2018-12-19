import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../../actions/users'
import { cancelSelectProduct } from '../../actions/products'
import './dashboard.css'

import WelcomeMessage from '../ui/WelcomeMessage'
import ProductsListContainer from './ProductsListContainer'
import ActiveOrderContainer from './ActiveOrderContainer'
import QuantityCheck from '../products/QuantityCheck'

import CSSTransition from 'react-transition-group/CSSTransition'

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
          {!this.props.activeOrderExists && this.props.activeOrderChecked && <WelcomeMessage name={this.props.user.name} />}
          {!this.props.activeOrderExists && this.props.activeOrderChecked && <div className="fade-in-fast"><ProductsListContainer /></div>}
          {this.props.activeOrderExists && this.props.activeOrderChecked && <ActiveOrderContainer />}
          {this.props.productSelected && <QuantityCheck pluralizedText={this.props.selectedProduct.pluralized_name} cancelSelectProduct={this.props.cancelSelectProduct}/>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    productSelected: state.products.productSelected,
    selectedProduct: state.products.selectedProduct,
    activeOrderExists: state.order.activeOrderExists,
    activeOrderChecked: state.user.activeOrderChecked
  }
}

export default connect(mapStateToProps, { logout, cancelSelectProduct })(Dashboard);

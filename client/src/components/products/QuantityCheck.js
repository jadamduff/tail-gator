import React, { Component } from 'react'

import QuantityForm from '../forms/QuantityForm'
import '../ui/ui.css'

class QuantityCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mount: true,
      divClasses: {
        screen: ['screen'],
        topDrawerMd: ['top-drawer-md', 'slide-down-fast']
      }
    }
  }

  openDrawer = () => {
    this.setState({
      mount: true,
      divClasses: {
        screen: ['screen'],
        topDrawerMd: ['top-drawer-md', 'top-drawer-md-mounted', 'slide-down-fast']
      }
    })
  }

  closeDrawer = () => {
    this.setState({
      mount: false,
      divClasses: {
        screen: [''],
        topDrawerMd: ['top-drawer-md', 'slide-up-fast']
      }
    })
  }

  handleScreenClick = () => {
    this.closeDrawer();
  }

  componentDidMount() {
    this.openDrawer();
  }

  componentDidUpdate() {
    if (!this.state.mount) {
      setTimeout(this.props.cancelSelectProduct, 150);
    }
  }

  render() {
    return (
      <div className="screen-container">
        <div className={this.state.divClasses.screen.join(' ')} onClick={this.handleScreenClick}></div>
        <div className={this.state.divClasses.topDrawerMd.join(' ')}>
          <div className="inline-block">How many {this.props.pluralizedText}?</div>
          <QuantityForm closeDrawer={this.closeDrawer} />
        </div>
      </div>
    )
  }
}

export default QuantityCheck;

import React, { Component } from 'react'
import { connect } from 'react-redux';

import { deleteListItem } from '../../actions/list_items.js'

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteBtn: false
    }
  }

  renderTotalorDeleteBtn = () => {
    if (this.state.showDeleteBtn) {
      return <span style={{color: '#E57373'}}>Remove</span>
    } else {
      return this.props.listItem.display_total
    }
  }

  handleTotalMouseEnter = () => {
    this.setState({
      showDeleteBtn: true
    })
  }

  handleTotalMouseLeave = () => {
    this.setState({
      showDeleteBtn: false
    })
  }

  handleTotalClick = () => {
    this.props.deleteListItem(this.props.listItem.id, this.props.listItem.order_id);
  }

  render() {
    return (
      <div className="list-item-container fade-in-fast" onMouseEnter={this.handleTotalMouseEnter} onMouseLeave={this.handleTotalMouseLeave}>
        <div className="list-item-desc">{this.props.listItem.description}</div>
        <div className="list-item-total" onClick={this.handleTotalClick}>{this.renderTotalorDeleteBtn()}</div>
      </div>
    )
  }
}

export default connect(null, { deleteListItem })(ListItem);

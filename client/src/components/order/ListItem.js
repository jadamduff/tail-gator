import React, { Component } from 'react'

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteBtn: false
    }
  }

  renderTotalorDeleteBtn = () => {
    if (this.state.showDeleteBtn) {
      return 'X'
    } else {
      return this.props.listItem.display_total
    }
  }

  render() {
    return (
      <div className="list-item-container fade-in-fast">
        <div className="list-item-desc">{this.props.listItem.description}</div>
        <div className="list-item-total">{this.renderTotalorDeleteBtn()}</div>
      </div>
    )
  }
}

export default ListItem;

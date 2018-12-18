import React from 'react'

const ListItem = ({ listItem }) => {
  return (
    <div className="list-item-container">
      <div className="list-item-desc">{listItem.list_item}</div>
      <div className="list-item-total">{listItem.list_item_total}</div>
    </div>
  )
}

export default ListItem;

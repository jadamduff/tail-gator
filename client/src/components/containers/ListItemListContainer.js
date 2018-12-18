import React from 'react'

import ListItem from '../order/ListItem'

const ListItemListContainer = ({ listItems }) => {

  const renderListItems = () => {
    return listItems.map((listItem, i) => {
      return (<ListItem listItem={listItem} key={i} />)
    })
  }

  return (
    <div className="active-order-list-item-list-container">
      {renderListItems()}
    </div>
  )
}

export default ListItemListContainer;

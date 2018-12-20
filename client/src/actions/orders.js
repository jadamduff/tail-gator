export function createOrder(user_id, product_id, product_quantity) {
  return (dispatch) => {
    dispatch({type: 'START_CREATE_ORDER_REQUEST'});
    let body = JSON.stringify({user_id: user_id, product_id: product_id, product_quantity: product_quantity })
    return fetch('/api/v1/orders',
      {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
        },
        body: body
      }
    )
    .then(response => response.json())
    .then((resp) => {
      console.log(resp)
      dispatch({type: 'CREATE_ORDER_SUCCESS', order: resp})
      return true
    })
  }
}

export function addListItemToOrder(order_id, product_id, product_quantity) {
  return (dispatch) => {
    dispatch({type: 'START_ADD_LIST_ITEM_TO_ORDER_REQUEST'});
    let body = JSON.stringify({product_id: product_id, product_quantity:product_quantity, request_type: 'Add List Item'});
    return fetch('/api/v1/orders/' + order_id.toString(),
      {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
        },
        body: body
      }
    )
    .then(response => response.json())
    .then((resp) => {
      console.log(resp)
      dispatch({type: 'ADD_LIST_ITEM_TO_ORDER_REQUEST_SUCCESS', order: resp})
      return true
    })
  }
}

export function updateOrderLocation(order_id, address, lat, lng) {
  return (dispatch) => {
    dispatch({type: 'START_UPDATE_ORDER_LOCATION_REQUEST'});
    let body = JSON.stringify({address: address, lat: lat, lng: lng, request_type: 'Update Location'})
    return fetch('/api/v1/orders/' + order_id.toString(),
      {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
        },
        body: body
      }
    )
    .then(response => response.json())
    .then((resp) => {
      console.log('Update Response: ', resp)
      dispatch({type: 'UPDATE_ORDER_LOCATION_REQUEST_SUCCESS', order: resp})
      return true
    })
  }
}

export function updateOrderStatus(order_id, status) {
  return (dispatch) => {
    dispatch({type: 'START_UPDATE_ORDER_STATUS_REQUEST'});
    let body = JSON.stringify({request_type: 'Update Status', status: status})
    return fetch('/api/v1/orders/' + order_id,
      {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
        },
        body: body
      }
    )
    .then(response => response.json())
    .then(resp => {
      console.log(resp)
      dispatch({type: 'UPDATE_ORDER_STATUS_REQUEST_SUCCESS', order: resp})
    })
  }
}

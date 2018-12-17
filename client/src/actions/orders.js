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
      dispatch({type: 'CREATE_ORDER_SUCCESS', order: resp})
      return true
    })
  }
}

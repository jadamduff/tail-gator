export function getProducts() {
  return (dispatch) => {
    dispatch({type: 'START_PRODUCT_LIST_REQUEST'});
    return fetch('/api/v1/product_list', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((resp) => {
      console.log('Received products: ', resp.products);
      dispatch({type: 'PRODUCT_LIST_RECEIVED', products: resp.products})
    })
  }
}

export function selectProduct(selectedProduct) {
  return (dispatch) => {
    dispatch({type: 'USER_SELECTED_PRODUCT', selectedProduct: selectedProduct})
  }
}

export function cancelSelectProduct() {
  console.log('clicked cancel')
  return (dispatch) => {
    dispatch({type: 'CANCEL_USER_SELECTED_PRODUCT'})
  }
}

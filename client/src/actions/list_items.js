export function deleteListItem(list_item_id, order_id) {
  return (dispatch) => {
    dispatch({type: 'START_DELETE_LIST_ITEM_REQUEST'})
    return fetch('/api/v1/list_items/' + list_item_id,
      {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({order_id: order_id})
      }
    )
    .then(response => response.json())
    .then((resp) => {
      console.log(resp)
      dispatch({type: 'DELETE_LIST_ITEM_REQUEST_SUCCESS', order: resp})
    })
  }
}

export function getBraintreeClientToken() {
  return (dispatch) => {
    dispatch(type: 'START_BRAINTREE_CLIENT_TOKEN_REQUEST');
    return fetch('/api/v1/braintree_client_token')
    .then(response => response.json())
    .then(resp => console.log(resp))
  }
}

export function getTestData() {
  return (dispatch) => {
    dispatch({type: 'START_GET_TEST_DATA_REQUEST'});
    return fetch('/api/v1/test_data')
    .then(response => response.json())
    .then(data => dispatch({type: 'GET_TEST_DATA', payload: data}))
  }
}

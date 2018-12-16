export default function testReducer(state = {name: 'Bob'}, action) {
  switch(action.type) {
    case 'START_GET_TEST_DATA_REQUEST':
      console.log('loading')
      return {}
    case 'GET_TEST_DATA':
      return {name: action.payload.name}
    default:
      return state
  }
}

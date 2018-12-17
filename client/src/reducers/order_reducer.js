export default function orderReducer(state = {
  activeOrderExists: false
}, action) {
  switch(action.type) {

    case 'START_CREATE_ORDER_REQUEST':
      return state

    default:
      return state
  }
}

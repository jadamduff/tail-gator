export default function orderReducer(state = {
  activeOrderExists: false
}, action) {
  switch(action.type) {

    case 'START_CREATE_ORDER_REQUEST':
      return state

    case 'CREATE_ORDER_SUCCESS':
      return {
        ...action.order,
        activeOrderExists: true
      }

    default:
      return state
  }
}

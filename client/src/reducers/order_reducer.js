export default function orderReducer(state = {
  activeOrderExists: false,
  order: {
    id: null
  }
}, action) {
  switch(action.type) {

    case 'START_CREATE_ORDER_REQUEST':
      return state

    case 'CREATE_ORDER_SUCCESS':
      return {
        ...action.order,
        activeOrderExists: true
      }

    case 'START_ADD_LIST_ITEM_TO_ORDER_REQUEST':
      return state

    case 'ADD_LIST_ITEM_TO_ORDER_REQUEST_SUCCESS':
      return {
        ...action.order,
        activeOrderExists: true
      }

    default:
      return state
  }
}

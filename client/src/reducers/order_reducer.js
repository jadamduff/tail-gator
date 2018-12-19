export default function orderReducer(state = {
  activeOrderExists: false,
  order: {
    id: null
  }
}, action) {
  switch(action.type) {

    case 'START_GET_ACTIVE_ORDER_REQUEST':
      return state

    case 'GET_ACTIVE_ORDER_SUCCESS':
      if (action.order.activeOrderExists) {
        return action.order
      } else {
        return state
      }

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

    case 'START_DELETE_LIST_ITEM_REQUEST':
      return state

    case 'DELETE_LIST_ITEM_REQUEST_SUCCESS':
      if (action.order.order) {
        return {
          ...action.order,
          activeOrderExists: true
        }
      } else {
        return {
          activeOrderExists: false,
          order: {
            id: null
          }
        }
      }

    case 'LOGOUT_SUCCESS':
      return {
        activeOrderExists: false,
        order: {
          id: null
        }
      }

    default:
      return state
  }
}

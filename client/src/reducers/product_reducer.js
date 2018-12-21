export default function productReducer(state = {
  products: [],
  productSelected: false,
  selectedProduct: null
}, action) {
  switch(action.type) {

    case 'START_PRODUCT_LIST_REQUEST':
      return state

    case 'PRODUCT_LIST_RECEIVED':
      console.log('Persisted :', action.products)
      return {...state, products: action.products}

    case 'USER_SELECTED_PRODUCT':
      return {...state, productSelected: true, selectedProduct: action.selectedProduct, selectedProductPluralized: action.pluralized}

    case 'CANCEL_USER_SELECTED_PRODUCT':
      return {...state, productSelected: false, selectedProduct: null}

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        productSelected: false,
        selectedProduct: null
      }

    default:
      return state
  }
}

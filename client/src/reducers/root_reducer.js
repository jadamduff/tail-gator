import { combineReducers } from 'redux'
import userReducer from './user_reducer'
import productReducer from './product_reducer'
import orderReducer from './order_reducer'

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  order: orderReducer
})

export default rootReducer;

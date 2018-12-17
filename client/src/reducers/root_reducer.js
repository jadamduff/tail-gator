import { combineReducers } from 'redux'
import userReducer from './user_reducer'
import productReducer from './product_reducer'

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer
})

export default rootReducer;

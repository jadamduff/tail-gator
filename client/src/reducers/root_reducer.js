import { combineReducers } from 'redux'
import testReducer from './test_reducer'
import userReducer from './user_reducer'

const rootReducer = combineReducers({
  test: testReducer,
  user: userReducer
})

export default rootReducer;

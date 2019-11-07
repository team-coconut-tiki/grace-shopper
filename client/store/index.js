import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import singleUser from './singleUser'
import allProducts from './allProducts'
import categories from './categories'
import allUsersAdmin from './allUsersAdmin'
import singleProduct from './singleProduct'

const reducer = combineReducers({
  singleUser,
  allProducts,
  categories,
  allUsersAdmin,
  singleProduct
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './allUsersAdmin'
export * from './singleUser'
export * from './allProducts'
export * from './categories'
export * from './singleProduct'

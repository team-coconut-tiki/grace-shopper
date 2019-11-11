import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import currentUser from './currentUser'
import allProducts from './allProducts'
import categories from './categories'
import allUsersAdmin from './allUsersAdmin'
import singleProduct from './singleProduct'
import otherUser from './otherUser'
import allOrders from './allOrders'
import carts from './carts'
import allReviews from './allReviews'
import singleReview from './singleReview'
import singleOrder from './singleOrder'
import stripe from './stripe'
import userOrders from './userOrders'

const reducer = combineReducers({
  currentUser,
  allProducts,
  categories,
  allUsersAdmin,
  singleProduct,
  carts,
  otherUser,
  allOrders,
  stripe,
  userOrders,
  allReviews,
  singleReview,
  singleOrder
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './allUsersAdmin'
export * from './currentUser'
export * from './allProducts'
export * from './categories'
export * from './singleProduct'
export * from './carts'
export * from './stripe'
export * from './otherUser'
export * from './singleOrder'
export * from './userOrders'
export * from './allReviews'
export * from './singleReview'
export * from './singleOrder'

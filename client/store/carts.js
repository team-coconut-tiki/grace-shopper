import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CARTS = 'GET_ALL_CARTS' //admin
const GET_USER_CARTS = 'GET_USER_CARTS' //for logged in
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS' //for logged in
const ADD_TO_CART = 'ADD_TO_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  list: [], //admin
  currentCarts: [], //cartItem rows
  cartProducts: [] //product info
}

/**
 * ACTION CREATORS
 */
export const getCarts = carts => ({type: GET_ALL_CARTS, carts})
export const getCartProducts = products => ({type: GET_CART_PRODUCTS, products})
export const getUserCarts = carts => ({type: GET_USER_CARTS, carts})
export const addToCart = item => ({type: ADD_TO_CART, item})

/**
 * THUNK CREATORS
 */
export const getAllCarts = () => async dispatch => {
  try {
    const res = await axios.get('/api/carts')
    dispatch(getCarts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllUserCarts = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/cart`)
    const resJr = await axios.get(`/api/carts/${userId}`)
    dispatch(getCartProducts(res.data.products))
    dispatch(getUserCarts(resJr.data))
  } catch (err) {
    console.error(err)
  }
}
//where do we check if someone has logged in?
export const addToCartThunk = (
  userId,
  productId,
  quantity,
  price
) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/carts/${userId}/${productId}`, {
      quantity: quantity,
      priceInCents: price
    })
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARTS:
      return {...state, list: action.carts}
    case GET_USER_CARTS:
      return {
        ...state,
        currentCarts: [...action.carts]
      }
    case GET_CART_PRODUCTS:
      return {
        ...state,
        cartProducts: action.products
      }
    case ADD_TO_CART:
      return {...state, currentCarts: [...state.currentCarts, action.item]}
    default:
      return state
  }
}

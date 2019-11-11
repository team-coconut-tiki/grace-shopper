import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CARTS = 'GET_ALL_CARTS' //admin
const GET_USER_CART = 'GET_USER_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  list: [], //admin
  currentCarts: [] //cartItem rows
}

/**
 * ACTION CREATORS
 */
export const getCarts = carts => ({type: GET_ALL_CARTS, carts})
export const getUserCart = products => ({type: GET_USER_CART, products})
export const addToCart = item => ({type: ADD_TO_CART, item})
export const clearCart = () => ({type: CLEAR_CART})
export const removeFromCart = productId => ({
  type: REMOVE_FROM_CART,
  productId
})
export const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})

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

export const fetchUserCart = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/cart`)
    dispatch(getUserCart(res.data.products)) //in each arr elem, 'cart_items' is cart row info
  } catch (err) {
    console.error(err)
  }
}

export const addToCartThunk = (userId, productId, price) => async dispatch => {
  try {
    await axios.post(`/api/carts/${userId}/${productId}`, {
      priceInCents: price
    })
    const cart = await axios.get(`/api/users/${userId}/cart`)
    dispatch(addToCart(cart.data.products))
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCartThunk = (userId, productId) => async dispatch => {
  try {
    await axios.delete(`/api/carts/${userId}/${productId}`)
    dispatch(removeFromCart(productId))
  } catch (error) {
    console.error(error)
  }
}

export const updateCartThunk = (
  userId,
  productId,
  newQty
) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/carts/${userId}/${productId}`, {
      quantity: newQty
    })
    dispatch(updateCart(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARTS:
      return {...state, list: action.carts}
    case GET_USER_CART:
      return {
        ...state,
        currentCarts: action.products
      }
    case ADD_TO_CART:
      return {...state, currentCarts: action.item}
    case CLEAR_CART:
      return {...state, currentCarts: []}
    case REMOVE_FROM_CART:
      return {
        ...state,
        currentCarts: state.currentCarts.filter(cartRow => {
          return cartRow.id !== action.productId
        })
      }
    case UPDATE_CART:
      return {
        ...state,
        currentCarts: state.currentCarts.map(cartRow => {
          if (cartRow.id === action.cart.productId) {
            cartRow.cart_item.quantity = action.cart.quantity
            return cartRow
          } else {
            return cartRow
          }
        })
      }

    default:
      return state
  }
}

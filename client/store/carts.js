import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CARTS = 'GET_ALL_CARTS'
const ADD_TO_CART = 'ADD_TO_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  list: [], //admin
  currentCarts: []
}

/**
 * ACTION CREATORS
 */
export const getCarts = carts => ({type: GET_ALL_CARTS, carts})
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
//where do we check if someone has logged in?
export const addToCartThunk = (
  userId,
  productId,
  quantity,
  price
) => async dispatch => {
  try {
    console.log('in the thunk')
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
    case ADD_TO_CART:
      return {...state, currentCarts: [...state.currentCarts, action.item]}
    default:
      return state
  }
}

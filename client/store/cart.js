import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CARTS = 'GET_ALL_CARTS'

/**
 * INITIAL STATE
 */
const initialState = {
  list: [],
  activeCartList: []
}

/**
 * ACTION CREATORS
 */
const getCarts = carts => ({type: GET_ALL_CARTS, carts})

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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARTS:
      return {...state, list: action.carts}
    default:
      return state
  }
}

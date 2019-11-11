import axios from 'axios'

//action type
const CHECKOUT = 'CHECKOUT'
const UPDATE_SESSION_CART = 'UPDATE_SESSION_CART'
const DELETE_SESSION_CART = 'DELETE_SESSION_CART'

//action creator
export const checkoutItems = sessionId => {
  return {
    type: CHECKOUT,
    sessionId
  }
}
export const updateSessionCart = sessionId => {
  return {
    type: UPDATE_SESSION_CART,
    sessionId
  }
}
export const deleteSessionCart = () => {
  return {
    type: DELETE_SESSION_CART
  }
}

//thunk

export const checkoutThunk = lineItems => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/stripe', {lineItems})
      dispatch(checkoutItems(res.data.id))
    } catch (err) {
      console.error(err)
    }
  }
}

//if adding/removing from cart - use this thunk
export const updateSessionCartThunk = (sessionId, lineItems) => {
  return async dispatch => {
    const res = await axios.put(`/api/stripe/${sessionId}`, {lineItems})
    dispatch(checkoutItems(res.data.id))
  }
}

//used to delete entire session/cart. NOT for removing cart items
export const deleteSessionCartThunk = sessionId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/stripe/${sessionId}`)
      dispatch(deleteSessionCart(sessionId))
    } catch (err) {
      console.error(err)
    }
  }
}

//reducer
const initialState = {sessionId: null}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT:
      return {...state, sessionId: action.sessionId}
    case DELETE_SESSION_CART:
      return initialState
    default:
      return state
  }
}

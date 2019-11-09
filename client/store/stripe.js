import axios from 'axios'

//action type
const CHECKOUT = 'CHECKOUT'

//action creator

export const checkoutItems = sessionId => {
  return {
    type: CHECKOUT,
    sessionId
  }
}

//thunk

export const checkoutThunk = lineItems => {
  return async dispatch => {
    const res = await axios.post('/api/stripe', {lineItems})
    dispatch(checkoutItems(res.data.id))
  }
}

//reducer
const initialState = {sessionId: null}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT:
      return {...state, sessionId: action.sessionId}
    default:
      return state
  }
}

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
    const res = await axios.get('/api/stripe', {lineItems: lineItems})
    console.log('in the thunk', res)
    dispatch(checkoutItems(res.data.id))
  }
}

//reducer
const initialState = {sessionId: null}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT:
      console.log('in reducer, action.sessionId')
      return {...state, sessionId: action.sessionId}
    default:
      return state
  }
}

import axios from 'axios'

//action types
const GET_USER_ORDERS = 'GET_USER_ORDERS'

//action creators
const getOrders = orders => ({type: GET_USER_ORDERS, orders})

export const getUserOrdersThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    dispatch(getOrders(data))
  } catch (error) {
    console.error('Error getting all user orders', error)
  }
}

const initialState = {
  orders: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

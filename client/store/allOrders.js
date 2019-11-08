import axios from 'axios'

//action types
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

//action creators
const getOrders = orders => ({type: GET_ALL_ORDERS, orders})

//thunk
export const getOrdersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(getOrders(data))
  } catch (error) {
    console.error('Error getting all orders, ', error)
  }
}

const initialState = {
  orders: []
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

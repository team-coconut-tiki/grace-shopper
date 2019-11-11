import axios from 'axios'

//action types
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER_PAID = 'UPDATE_ORDER_PAID'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

//action creators
export const createOrder = () => ({
  type: CREATE_ORDER
})
export const getOrder = order => ({type: GET_SINGLE_ORDER, order})
export const updateOrderPaid = () => ({type: UPDATE_ORDER_PAID})
export const updateOrderStatus = order => ({type: UPDATE_ORDER_STATUS, order})

//thunks
export const getOrderThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(getOrder(data))
  } catch (error) {
    console.error('Error getting order, ', error)
  }
}

export const createOrderThunk = (userId, subtotal) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/orders/${userId}`, subtotal)
      dispatch(createOrder())
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateOrderPaidThunk = (userId, status) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${userId}`, status)
      dispatch(updateOrderPaid())
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateOrderStatusThunk = (orderId, status) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${orderId}`)
      data.status = status
      await axios.put(`/api/orders/${orderId}`, {status: data.status})
      dispatch(updateOrderStatus(data))
    } catch (error) {
      console.error('error updating order status', error)
    }
  }
}

//reducer
const initialState = {
  order: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return {...state, order: action.order}
    case CREATE_ORDER:
      return state
    case UPDATE_ORDER_PAID:
      return state
    case UPDATE_ORDER_STATUS:
      return {...state, order: action.order}
    default:
      return state
  }
}

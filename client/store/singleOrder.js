import axios from 'axios'

//action types
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_USER_ORDER = 'UPDATE_USER_ORDER'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'
const GET_USERS_ORDER = 'GET_USERS_ORDER'

//action creators
export const createOrder = () => ({
  type: CREATE_ORDER
})
export const getOrder = order => ({type: GET_SINGLE_ORDER, order})
export const updateOrderPaid = () => ({type: UPDATE_USER_ORDER})
export const updateOrderStatus = order => ({type: UPDATE_ORDER_STATUS, order})
export const getUsersOrder = order => ({type: GET_USERS_ORDER, order})

//thunks
export const getOrderThunk = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(getOrder(data))
  } catch (error) {
    console.error('Error getting order, ', error)
  }
}

export const createOrderThunk = (userId, subtotal) => {
  return async dispatch => {
    try {
      await axios.post(`/api/orders/users/${userId}`, subtotal)
      dispatch(createOrder())
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateUserOrderThunk = (userId, status) => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/users/${userId}`, status)
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

export const getUsersOrderThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/users/${userId}`)
      dispatch(getUsersOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//reducer
const initialState = {
  order: {},
  latestOrder: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return {...state, order: action.order}
    case CREATE_ORDER:
      return state
    case UPDATE_USER_ORDER:
      return state
    case UPDATE_ORDER_STATUS:
      return {...state, order: action.order}
    case GET_USERS_ORDER:
      return {...state, latestOrder: action.order}
    default:
      return state
  }
}

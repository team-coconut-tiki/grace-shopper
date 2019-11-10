import axios from 'axios'

const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'

const getOrder = order => ({type: GET_SINGLE_ORDER, order})

export const getOrderThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(getOrder(data))
  } catch (error) {
    console.error('Error getting order, ', error)
  }
}

const initialState = {
  order: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return {...state, order: action.order}
    default:
      return state
  }
}

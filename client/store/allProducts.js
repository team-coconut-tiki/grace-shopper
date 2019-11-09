import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  products: []
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addNewProduct = product => async dispatch => {
  try {
    const res = await axios.post('/api/products', product)
    dispatch(getProducts(res.data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}

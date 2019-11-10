import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

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
const addProduct = product => ({type: ADD_NEW_PRODUCT, product})
const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})

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
    dispatch(addProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteProductThunk = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deleteProduct(productId))
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
    case ADD_NEW_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.id !== action.productId
        })
      }
    default:
      return state
  }
}

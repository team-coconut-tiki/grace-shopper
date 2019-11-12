import axios from 'axios'
import {runInNewContext} from 'vm'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const CHANGE_INVENTORY = 'CHANGE_INVENTORY'

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
export const updateProduct = product => ({type: UPDATE_PRODUCT, product})
export const changeInventory = product => ({type: CHANGE_INVENTORY, product})

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

export const updateProductThunk = (product, productId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${productId}`, product)
    dispatch(updateProduct(data))
  } catch (err) {
    console.error(err)
  }
}

export const changeInventoryThunk = (product, reduceNum) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${product.id}`, reduceNum)
    dispatch(changeInventory(data))
  } catch (err) {
    console.error(err)
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
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.product.id) {
            return action.product
          } else return product
        })
      }
    case CHANGE_INVENTORY:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.product.id) {
            return action.product
          } else return product
        })
      }
    default:
      return state
  }
}

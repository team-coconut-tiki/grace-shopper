import axios from 'axios'

//action types
const GET_PRODUCT = 'GET_PRODUCT'
const SET_REVIEWS = 'GET_REVIEWS'
const ADD_TO_CART = 'ADD_TO_CART'

//initialState
const initialState = {
  selectedProduct: {},
  reviews: []
}

//action creator
export const getProduct = product => ({type: GET_PRODUCT, product})
export const setReviews = reviews => ({type: SET_REVIEWS, reviews})
export const addToCart = item => ({type: ADD_TO_CART, item})

//thunk creator
export const fetchProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(getProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchReviews = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/reviews')
    dispatch(setReviews(data))
  } catch (err) {
    console.error(err)
  }
}

//where do we check if someone has logged in?
export const addToCartThunk = (
  userId,
  productId,
  quantity,
  price
) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/carts/${userId}/${productId}`, {
      quantity: quantity,
      priceInCents: price
    })
    dispatch(addToCart(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, selectedProduct: action.product}
    case SET_REVIEWS:
      return {...state, reviews: action.reviews}
    default:
      return state
  }
}

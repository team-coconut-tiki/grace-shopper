import axios from 'axios'

//action types
const GET_PRODUCT = 'GET_PRODUCT'
const SET_REVIEWS = 'GET_REVIEWS'

//initialState
const initialState = {
  selectedProduct: {},
  reviews: []
}

//action creator
export const getProduct = product => ({type: GET_PRODUCT, product})
export const setReviews = reviews => ({type: SET_REVIEWS, reviews})

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

//reducer

export default (state = initialState, action) => {
  switch (action.type) {
    // REVIEW: GET vs SET
    case GET_PRODUCT:
      return {...state, selectedProduct: action.product}
    case SET_REVIEWS:
      return {...state, reviews: action.reviews}
    default:
      return state
  }
}

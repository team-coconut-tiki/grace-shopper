import axios from 'axios'

const initialState = []

const GET_REVIEWS = 'GET_REVIEWS'

const getReviews = reviews => ({type: GET_REVIEWS, reviews})

export const getReviewsByProductThunk = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/reviews/${productId}`)
    if (!data) {
      throw new Error("couldn't get reviews")
    }
    dispatch(getReviews(data))
  } catch (err) {
    console.error(err)
  }
}
export const getReviewsByUserThunk0 = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/reviews/user/${userId}`)
    if (!data) {
      throw new Error("couldn't get reviews from user")
    }
    dispatch(getReviews(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    default:
      return state
  }
}

import axios from 'axios'

const initialState = {}

const CREATE_REVIEW = 'CREATE_REVIEW'
const ALTER_REVIEW = 'ALTER_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

const createReview = review => ({type: CREATE_REVIEW, review})
const alterReview = review => ({type: ALTER_REVIEW, review})
const deleteReview = () => ({type: DELETE_REVIEW})

export const createReviewThunk = (review, userId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/reviews/${productId}`, {
      ...review,
      userId
    })
    if (!data) {
      throw new Error("Couldn't alter review")
    }
    dispatch(createReview(review))
  } catch (err) {
    console.error(err)
  }
}
export const alterReviewThunk = (user, review) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/reviews/${productId}`, {
      ...review,
      user
    })
    if (!data) {
      throw new Error("Couldn't alter review")
    }
    dispatch(alterReview(review.productId, user.id, review))
  } catch (err) {
    console.error(err)
  }
}
export const deleteReviewThunk = (
  reviewId,
  isUser,
  relevantId
) => async dispatch => {
  try {
    await axios.delete(`/api/reviews/${reviewId}`)
    const {data} = await axios.get(
      isUser ? `/api/reviews/user/${relevantId}` : `/api/reviews/${relevantId}`
    )
    dispatch(isUser ? getReviewsByUser(data) : getReviewsByProduct(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_REVIEW:
      return action.review
    case ALTER_REVIEW:
      return action.review
    case DELETE_REVIEW:
      return initialState
    default:
      return state
  }
}

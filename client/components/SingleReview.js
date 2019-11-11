import React, {useEffect} from 'react'

const SingleReview = props => {
  const review = props.review
  const getUser = async () => {
    const user = await axios.get(`/api/users/${review.userId}`)
    console.log(user)
    return user
  }
  const reviewUser = getUser()
  console.log('Review user:', reviewUser)

  return (
    <div className="review">
      <div className="review-rating">
        {
          review.rating /* add stars either filled or unfilled based on rating */
        }
      </div>
      <div className="review-title">{review.title}</div>
      <div className="review-description">{review.description}</div>
      <div className="review-user">{reviewUser.fullName}</div>
    </div>
  )
}

export default SingleReview

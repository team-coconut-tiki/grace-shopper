import React, {useEffect} from 'react'
import axios from 'axios'

const SingleReview = props => {
  const review = props.review
  let reviewUser = review.user
  return (
    <div className="review">
      <div className="review-rating">
        {review.rating +
          '/5 stars' /* add stars either filled or unfilled based on rating */}
      </div>
      <div className="review-title">{review.title}</div>
      <div className="review-description">{review.description}</div>
      <div className="review-user">{reviewUser && reviewUser.fullName}</div>
    </div>
  )
}

export default SingleReview

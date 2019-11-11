import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

const SingleReview = props => {
  const review = props.review
  let reviewUser = review.user
  const currentUser = useSelector(state => state.currentUser)
  const [formState, setFormState] = useState()
  console.log(reviewUser)
  console.log(currentUser)
  return (
    <div className="review message is-link is-small container">
      <div className="review-title message-header">
        {review.product.title + ' -- ' + review.title + '  '}
        {(reviewUser.id === currentUser.id || currentUser.isAdmin) && (
          <span className="icon">
            <i className="fas fa-edit link-cursor margin-right" />
            <h6 className="link-cursor">X</h6>
          </span>
        )}
      </div>
      <div className="review-rating">
        {review.rating +
          '/5 stars' /* add stars either filled or unfilled based on rating */}
      </div>
      <div className="review-description message-body">
        {review.description}
      </div>
      <div className="review-user message-footer">
        {reviewUser && reviewUser.fullName}
      </div>
    </div>
  )
}

export default SingleReview

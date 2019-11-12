import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

const SingleReview = props => {
  const review = props.review
  let reviewUser = review.user
  const currentUser = useSelector(state => state.currentUser)
  const [formState, setFormState] = useState()

  return (
    // <div className="review message is-info container">
    //   <div className="review-title message-header">
    //     {review.title}
    //     {(reviewUser.id === currentUser.id || currentUser.isAdmin) && (
    //       <span className="icon">
    //         <i className="fas fa-edit link-cursor margin-right" />
    //         <h6 className="link-cursor">
    //           <i className="fas fa-trash" />
    //         </h6>
    //       </span>
    //     )}
    //   </div>
    //   <div className="review-rating">
    //     {review.rating +
    //       '/5 stars' /* add stars either filled or unfilled based on rating */}
    //   </div>
    //   <div className="tile">{review.description}</div>
    //   <div className="review-user">--{reviewUser && reviewUser.fullName}</div>
    // </div>
    <div className="box">
      <article className="media">
        <div className="content">
          <strong>{review.title}</strong>
          <p>{review.description}</p>
          <div className="review-user">
            --{reviewUser && reviewUser.fullName}
          </div>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <span className="icon is-small">
              <i className="fas fa-star" aria-hidden="true" />
            </span>
            {review.rating > 1 ? (
              <span className="icon is-small">
                <i className="fas fa-star" aria-hidden="true" />
              </span>
            ) : (
              <span className="icon is-small">
                <i className="far fa-star" aria-hidden="true" />
              </span>
            )}
            {review.rating > 2 ? (
              <span className="icon is-small">
                <i className="fas fa-star" aria-hidden="true" />
              </span>
            ) : (
              <span className="icon is-small">
                <i className="far fa-star" aria-hidden="true" />
              </span>
            )}
            {review.rating > 3 ? (
              <span className="icon is-small">
                <i className="fas fa-star" aria-hidden="true" />
              </span>
            ) : (
              <span className="icon is-small">
                <i className="far fa-star" aria-hidden="true" />
              </span>
            )}
            {review.rating > 4 ? (
              <span className="icon is-small">
                <i className="fas fa-star" aria-hidden="true" />
              </span>
            ) : (
              <span className="icon is-small">
                <i className="far fa-star" aria-hidden="true" />
              </span>
            )}
          </div>
        </nav>
      </article>
    </div>
  )
}

export default SingleReview

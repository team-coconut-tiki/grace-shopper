import React from 'react'
// import {useSelector} from 'react-redux'

const SingleReview = props => {
  const review = props.review
  let reviewUser = review.user
  // const currentUser = useSelector(state => state.currentUser)

  return (
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

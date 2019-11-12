import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {
  getUserThunk,
  adminDeleteUserThunk,
  getOtherUserThunk,
  getReviewsByUserThunk
} from '../store/'

import AdminPanel from './AdminPanel'
import Cart from './Cart'
import SingleReview from './SingleReview'
import UpdateUserForm from './UpdateUserForm'
import {Signup} from './auth-form'

const SingleUser = props => {
  const route = props.match.params.id //url of page
  const isSameUser = props.currentUser.id === route //checks if authenticateduser is visiting their own page
  const user = isSameUser ? props.currentUser : props.otherUser
  const reviews = props.allReviews

  useEffect(() => {
    if (!isSameUser) {
      props.getOtherUserThunk(route)
    }
  }, [])
  useEffect(
    () => {
      props.getReviewsByUserThunk(user.id)
    },
    [user]
  )

  const isAdmin = props.currentUser.isAdmin
  return (
    <>
      <div className="columns">
        <div className="user-profile-container column box is-outlined is-rounded level">
          {!user ? (
            <Redirect to="/login" />
          ) : (
            !isSameUser &&
            !isAdmin && <Redirect to={`/users/${user.id || route}`} />
          )}
          {user.email ? (
            <UpdateUserForm user={user} isSameUser={isSameUser} />
          ) : (
            <Signup />
          )}

          {isAdmin && (
            <div className="delete-user-button box">
              <button
                type="button"
                className="delete-user-button button is-danger"
                onClick={() => {
                  try {
                    props.adminDeleteUser(user.id)
                    props.history.push('/')
                  } catch (err) {
                    console.error(err)
                  }
                }}
              >
                <span className="icon">
                  <i className="fas fa-trash" />
                </span>{' '}
                <p>Delete this user</p>
              </button>
            </div>
          )}
        </div>
        <div className="column">{isAdmin ? <AdminPanel /> : <Cart />}</div>
      </div>
      <div className="user-reviews box">
        {reviews &&
          reviews.map(review => (
            <SingleReview key={review.id} review={review} />
          ))}
      </div>
    </>
  )
}

export default connect(
  ({currentUser, otherUser, allReviews}) => ({
    currentUser,
    otherUser,
    allReviews
  }),
  {
    getUserThunk,
    getOtherUserThunk,
    adminDeleteUserThunk,
    getReviewsByUserThunk
  }
)(SingleUser)

import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {
  getUserThunk,
  adminDeleteUser,
  getOtherUserThunk,
  getReviewsByUserThunk
} from '../store/'
import EditUserButton from './EditUserButton'
import AdminPanel from './AdminPanel'
import Cart from './Cart'
import SingleReview from './SingleReview'
import UserOrders from './UserOrders'

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
          <div className="email">
            <h4 className="">User email: </h4>
            <p>{user.email}</p>
            <EditUserButton isSameUser={isSameUser} source="email" />
          </div>
          <div className="user-shipping-address">
            <h4>Shipping address:</h4>
            <p>{user.shippingAddress}</p>
            <EditUserButton isSameUser={isSameUser} source="shippingAddress" />
          </div>
          <div className="user-billing-address">
            <h4>Billing address:</h4>
            <p>{user.billingAddress}</p>
            <EditUserButton isSameUser={isSameUser} source="billingAddress" />
          </div>
          <div className="user-credit-card-short">
            <h4>Current credit card:</h4>
            <p>
              {user.creditCard
                ? `XXXX-XXXX-XXXX-${user.creditCard.slice(-4)}`
                : 'No Credit card associated with this account'}
            </p>
            <EditUserButton isSameUser={isSameUser} source="creditCard" />
          </div>
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
        <div className="column">
          {isAdmin ? <AdminPanel /> : <UserOrders userId={route} />}
        </div>
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
    adminDeleteUser,
    getReviewsByUserThunk
  }
)(SingleUser)

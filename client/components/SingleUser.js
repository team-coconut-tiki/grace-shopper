import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {getUserThunk, adminDeleteUser, getOtherUserThunk} from '../store/'
import EditUserButton from './EditUserButton'
import AdminPanel from './AdminPanel'
import Cart from './Cart'

const SingleUser = props => {
  const route = props.match.params.id
  const isSameUser = props.currentUser.id === route
  const user = isSameUser ? props.currentUser : props.otherUser
  useEffect(
    () => {
      if (!isSameUser) {
        props.getOtherUserThunk(route)
      }
    },
    [user.id]
  )
  // const isAdmin = props.location.search.includes('isAdmin=true')
  const isAdmin = props.currentUser.isAdmin
  return (
    <div className="columns">
      <div className="user-profile-container column">
        {!user ? (
          <Redirect to="/login" />
        ) : (
          !isSameUser &&
          !isAdmin && <Redirect to={`/users/${user.id || route}`} />
        )}
        <div className="email">
          {isAdmin && (
            <div className="delete-user-button">
              <button
                type="button"
                className="delete-user-button"
                onClick={() => {
                  try {
                    props.adminDeleteUser(user.id)
                    props.history.push('/')
                  } catch (err) {
                    console.error(err)
                  }
                }}
              >
                Delete this user
              </button>
            </div>
          )}
          <h4>User email: </h4>
          <p>{user.email}</p>
          <EditUserButton isSameUser={isSameUser} source="email" />
        </div>
        <div className="user-shipping-address">
          <h4>Current address:</h4>
          <p>{user.shippingAddress}</p>
          <EditUserButton isSameUser={isSameUser} source="shippingAddress" />
        </div>
        <div className="user-billing-address">
          <h4>Current address:</h4>
          <p>{user.billingAddress}</p>
          <EditUserButton isSameUser={isSameUser} source="billingAddress" />
        </div>
        <div className="user-credit-card-short">
          <h4>Current credit card:</h4>
          <p>
            {user.creditCard
              ? user.creditCard.slice(-4)
              : 'No Credit associated with this'}
          </p>
          <EditUserButton isSameUser={isSameUser} source="creditCard" />
        </div>
      </div>
      <div className="column">{isAdmin ? <AdminPanel /> : <Cart />}</div>
    </div>
  )
}

export default connect(
  ({currentUser, otherUser}) => ({currentUser, otherUser}),
  {
    getUserThunk,
    getOtherUserThunk,
    adminDeleteUser
  }
)(SingleUser)

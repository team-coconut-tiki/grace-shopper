import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {getUserThunk, adminDeleteUser} from '../store/'
import EditUserButton from './EditUserButton'

const SingleUser = props => {
  const route = props.match.params.id
  const isSameUser = props.currentUser.id === route
  let checkedOutUser
  if (!isSameUser) {
    const getUser = async () => {
      checkedOutUser = await axios.get(`/api/users/${route}`)
    }
    getUser()
  }
  const user = isSameUser ? props.currentUser : props.otherUser
  console.log(user)
  const isAdmin = props.location.search.includes('isAdmin=true')
  return (
    <div className="user-profile-container">
      {!user ? (
        <Redirect to="/login" />
      ) : (
        !isSameUser && !isAdmin && <Redirect to={`/users/${user.id}`} />
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
  )
}

export default connect(
  ({currentUser, otherUser}) => ({currentUser, otherUser}),
  {
    getUserThunk,
    adminDeleteUser
  }
)(SingleUser)

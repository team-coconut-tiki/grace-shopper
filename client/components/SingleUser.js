import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {getUserThunk, adminDeleteUser} from '../store/'
import EditUserButton from './EditUserButton'

const SingleUser = props => {
  const user = props.singleUser
  if (user) {
    return (
      <div className="user-profile-container">
        {user.id !== props.match.params.id &&
          !user.isAdmin && <Redirect to={`/users/${user.id}`} />}
        <div className="email">
          {props.singleUser.isAdmin && (
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
          <EditUserButton source="email" />
        </div>
        <div className="user-shipping-address">
          <h4>Current address:</h4>
          <p>{user.shippingAddress}</p>
          <EditUserButton source="shippingAddress" />
        </div>
        <div className="user-billing-address">
          <h4>Current address:</h4>
          <p>{user.billingAddress}</p>
          <EditUserButton source="billingAddress" />
        </div>
        <div className="user-credit-card-short">
          <h4>Current credit card:</h4>
          <p>
            {user.creditCard
              ? user.creditCard.slice(-4)
              : 'No Credit associated with this'}
          </p>
          <EditUserButton source="creditCard" />
        </div>
      </div>
    )
  } else {
    return <React.Fragment />
  }
}
export default connect(({singleUser}) => ({singleUser}), {
  getUserThunk,
  adminDeleteUser
})(SingleUser)

import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserThunk, deleteUserThunk} from '../store/'
import EditUserButton from './EditUserButton'
import axios from 'axios'

const SingleUser = props => {
  useEffect(() => {
    if (!props.user) {
      //const userId = props.location.pathname.split('/')[2]
      const userId = props.match.params.id
      props.getUserThunk(userId) // TODO check after auth
      // REVIEW: talk to me about userId
    }
  }, [])

  const user = props.user ? props.user : props.singleUser
  if (user) {
    return (
      <div className="user-profile-container">
        <div className="email">
          {props.singleUser.isAdmin && (
            <div className="delete-user-button">
              <button
                type="button"
                className="delete-user-button"
                onClick={() => {
                  try {
                    props.deleteUserThunk(user.id)
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
  deleteUserThunk
})(SingleUser)

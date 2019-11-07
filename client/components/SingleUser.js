import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/'
import EditUserButton from './EditUserButton'
import axios from 'axios'

const SingleUser = props => {
  useEffect(() => {
    if (!props.user) {
      const userId = props.location.pathname.split('/')[2]
      console.log('USERID', userId)
      props.getUserThunk(userId) // TODO check after auth
    }
  }, [])

  const user = props.user ? props.user : props.singleUser
  console.log('USEREMAIL', props)
  if (user) {
    return (
      <div className="user-profile-container">
        <div className="email">
          {props.singleUser.isAdmin && (
            <div className="delete-user-button">
              <button
                type="button"
                className="delete-user-button"
                onClick={async () => {
                  try {
                    console.log(user);
                    await axios.delete(`/api/users/${user.id}`)
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
export default connect(({singleUser}) => ({singleUser}), {getUserThunk})(
  SingleUser
)

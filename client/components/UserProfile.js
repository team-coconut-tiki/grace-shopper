import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/'
import {Link, withRouter} from 'react-router-dom'
import EditUserButton from './EditUserButton'

const UserProfile = props => {
  useEffect(() => {
    const userId = props.location.pathname.split('/')[2]
    console.log('USERID', userId)
    props.getUserThunk(userId)
  }, [])

  //
  // </EditUserButton>

  const user = props.singleUser
  console.log('USEREMAIL', props)
  if (user) {
    return (
      <div className="user-profile-container">
        <div className="email">
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
  UserProfile
)

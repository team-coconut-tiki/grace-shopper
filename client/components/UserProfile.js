import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/'
import {Link, withRouter} from 'react-router-dom'
import EditUserButton from './EditUserButton'

const UserProfile = props => {
  const [editingEmail, setEditingEmail] = useState(false)
  const [editingShippingAddress, setEditingShippingAddress] = useState(false)
  const [editingBillingAddress, setEditingBillingAddress] = useState(false)
  const [editingCreditCard, setCreditCard] = useState(false)

  useEffect(() => {
    // let userId = props.history.location.split();
    // userId = userId[userId.length - 1]
    // props.getUserThunk(userId)

    // I am useing this dummy data undil I set up history routing
    props.getUserThunk(1)
  }, [])

  //   <EditUserButton source="email" rendered={editingShippingAddress}></EditUserButton>
  //
  //   <EditUserButton source="shippingAddress" rendered={editingShippingAddress}></EditUserButton>
  //
  //   <EditUserButton source="billingAddress" rendered={editingBillingAddress}></EditUserButton>
  //
  // <EditUserButton source="creditCard" rendered={editingCreditCard} >
  //
  // </EditUserButton>

  const user = props.singleUser
  console.log('USEREMAIL', user)
  if (user) {
    return (
      <div className="user-profile-container">
        <div className="email">
          <h4>User email: </h4>
          <p>{user.email}</p>
          <EditUserButton />
        </div>
        <div className="user-shipping-address">
          <h4>Current address:</h4>
          <p>{user.shippingAddress}</p>
          <EditUserButton />
        </div>
        <div className="user-billing-address">
          <h4>Current address:</h4>
          <p>{user.billingAddress}</p>
          <EditUserButton />
        </div>
        <div className="user-credit-card-short">
          <h4>Current credit card:</h4>
          <p>
            {user.creditCard
              ? user.creditCard.slice(-4)
              : 'No Credit associated with this'}
          </p>
          <EditUserButton />
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

import React from 'react'
import EditUserButton from './EditUserButton'

const UpdateUserForm = props => {
  return (
    <div>
      <h2 className="title is-4">Welcome back, {props.user.fullName}</h2>
      <div className="email cat">
        <p>
          User email: <br />
          {props.user.email}
        </p>
        <EditUserButton isSameUser={props.isSameUser} source="email" />
      </div>
      <div className="user-shipping-address cat">
        <p>
          Shipping address: <br />
          {props.user.shippingAddress}
        </p>
        <EditUserButton
          isSameUser={props.isSameUser}
          source="shippingAddress"
        />
      </div>
      <div className="user-billing-address cat">
        <p>
          Billing address: <br />
          {props.user.billingAddress}
        </p>
        <EditUserButton isSameUser={props.isSameUser} source="billingAddress" />
      </div>
      <div className="user-credit-card-short cat">
        <p>
          Current credit card: <br />
          {props.user.creditCard
            ? `XXXX-XXXX-XXXX-${props.user.creditCard.slice(-4)}`
            : 'No Credit card associated with this account'}
        </p>
        <EditUserButton isSameUser={props.isSameUser} source="creditCard" />
      </div>
    </div>
  )
}

export default UpdateUserForm

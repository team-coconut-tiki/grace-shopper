import React from 'react'
import EditUserButton from './EditUserButton'

const UpdateUserForm = props => {
  return (
    <div>
      <div className="email">
        <h4 className="">User email: </h4>
        <p>{props.user.email}</p>
        <EditUserButton isSameUser={props.isSameUser} source="email" />
      </div>
      <div className="user-shipping-address">
        <h4>Shipping address:</h4>
        <p>{props.user.shippingAddress}</p>
        <EditUserButton
          isSameUser={props.isSameUser}
          source="shippingAddress"
        />
      </div>
      <div className="user-billing-address">
        <h4>Billing address:</h4>
        <p>{props.user.billingAddress}</p>
        <EditUserButton isSameUser={props.isSameUser} source="billingAddress" />
      </div>
      <div className="user-credit-card-short">
        <h4>Current credit card:</h4>
        <p>
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

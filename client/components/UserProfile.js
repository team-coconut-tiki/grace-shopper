import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/'
import {Link} from 'react-router-dom'

const UserProfile = props => {
  useEffect(() => {
    //   let userId = props.history.location.split();
    //   userId = userId[userId.length - 1]
    //   props.getUserThunk(userId)
    props.getUserThunk(1)
  })

  const user = props.singleUser
  console.log('USER', user)
  if (user) {
    return (
      <div className="user-profile-container">
        <div className="email">
          <p>{user.email}</p>
        </div>
        <div className="user-address">
          <p>{user.shippingAddress}</p>
        </div>
        <div className="user-credit-card-short">
          <p>{user.creditCard}</p>
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

import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {updateUserOrderThunk} from '../store'
import {useDispatch, useSelector} from 'react-redux'

const Cancel = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)

  const status = {prevStatus: 'open', nextStatus: 'cancelled'}

  useEffect(
    () => {
      user.id && dispatch(updateUserOrderThunk(user.id, status))
    },
    [user]
  )

  return (
    <div>
      <p>Your order has been canceled.</p>
      <br />
      <Link
        type="button"
        className="button is-medium is-success"
        to="/products"
      >
        <p>Return to Coconuts</p>
      </Link>
    </div>
  )
}

export default Cancel

import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
  updateUserOrderThunk,
  changeInventoryThunk,
  getUsersOrderThunk
} from '../store'
import {useDispatch, useSelector} from 'react-redux'

const Success = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  const latestOrder = useSelector(state => state.singleOrder.latestOrder)

  const status = {prevStatus: 'open', nextStatus: 'paid'}
  console.log(latestOrder)

  useEffect(
    () => {
      user.id && dispatch(getUsersOrderThunk(user.id))
      user.id && dispatch(updateUserOrderThunk(user.id, status))
    },
    [user]
  )

  return (
    <div>
      <p>
        Your order was successful! Thank you for shopping at the Tiki Store.
      </p>
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

export default Success

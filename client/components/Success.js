import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {updateOrderPaidThunk} from '../store'
import {useDispatch, useSelector} from 'react-redux'

const Success = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)

  useEffect(() => {
    // console.log('TEST', user)
    dispatch(updateOrderPaidThunk(user.id, {status: 'paid'}))
  })

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

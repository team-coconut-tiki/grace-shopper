import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {updateOrderThunk} from '../store'
import {useDispatch, useSelector} from 'react-redux'

const Success = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  const cartItems = useSelector(state => state.carts.currentCarts)

  console.log(cartItems)

  useEffect(
    () => {
      user.id && dispatch(updateOrderThunk(user.id, 'open', 'paid'))
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

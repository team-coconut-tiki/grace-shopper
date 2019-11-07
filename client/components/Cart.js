import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getAllUserCarts} from '../store'

const userId = 10 //change this once we figure out login

const Cart = () => {
  const dispatch = useDispatch()

  const cartItems = useSelector(state => state.carts.currentCarts)

  useEffect(() => {
    dispatch(getAllUserCarts(userId))
  }, [])

  console.log(cartItems)
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => <li>{item.title}</li>)}
    </div>
  )
}

export default Cart

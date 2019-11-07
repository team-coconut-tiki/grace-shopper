import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getAllUserCarts, fetchProduct, addToCartThunk} from '../store'

const userId = 10 //change this once we figure out login

const Cart = () => {
  const dispatch = useDispatch()
  //state.singleUser = {id: 1, email: ???, isLoggedIn: true}
  const cartItems = useSelector(state => state.carts.currentCarts)
  const user = useSelector(state => state.singleUser)
  console.log(user)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    dispatch(getAllUserCarts(userId))
  }, [])

  // state.allProducts.products
  // cartItems.productId

  //user: get Products!!!!!

  // let product1 = dispatch(fetchProduct(item.productId))
  const subtotal = cartItems.reduce((acc, cur) => {
    acc += cur.priceInCents
    return acc
  }, 0)
  // console.log(cartItems)
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => {
        return (
          <li key={item.createdAt}>
            This is the price of the coconut you wanted to buy {item.quantity}
            {/* <span className="icon">
              <i
                className="fas fa-sort-up"
                onClick={() =>
                  addToCartThunk(userId, item.productId, 1, item.priceInCents)
                }
              />
            </span> */}{' '}
            of: ${Math.floor(item.priceInCents / 100)}.{item.priceInCents
              .toString()
              .slice(-2)}
          </li>
        )
      })}
      <p>
        Subtotal: ${Math.floor(subtotal / 100)}.{subtotal.toString().slice(-2)}
      </p>
      <button
        type="submit"
        onClick={evt => evt.preventDefault()}
        className="button"
      >
        Complete Order
      </button>
    </div>
  )
}

export default Cart

import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  getAllUserCarts,
  getCartProducts,
  fetchProduct,
  addToCartThunk
} from '../store'

const Cart = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.singleUser)
  const cartProducts = useSelector(state => state.carts.cartProducts)
  const cartItems = useSelector(state => state.carts.currentCarts)

  console.log('cart', cartProducts)
  // const [quantity, setQuantity] = useState(0)

  useEffect(
    () => {
      //call getuser thing
      dispatch(getAllUserCarts(user.id))
      dispatch(getCartProducts(user.id))
    },
    [user]
  )

  const subtotal = cartItems.reduce((acc, cur) => {
    acc += cur.priceInCents * cur.quantity
    return acc
  }, 0)
  // console.log(cartItems)
  return (
    <div>
      <h2>Your Cart</h2>
      {Array.isArray(cartProducts) &&
        cartProducts.map((item, i) => {
          return (
            <li className="level" key={item.id}>
              <div className="level-left">
                <figure className="image is-64x64 level-item">
                  <img src={item.imageUrl} />
                </figure>
                <strong className="level-item">{item.title}</strong>
              </div>
              <div className="level-right">
                <p className="level-item">
                  x{'  '}
                  <input
                    type="number"
                    className="input is-rounded"
                    value={cartItem[i].quantity}
                  />
                </p>
                <p className="level-item">
                  ${Math.floor(cartItem[i].priceInCents / 100)}.{cartItem[
                    i
                  ].priceInCents
                    .toString()
                    .slice(-2)}
                </p>
              </div>
            </li>
          )
        })}
      <div className="level">
        <div className="level-left" />
        <div className="level-center" />
        <div className="level-right">
          <p className="level-item">
            <strong>Subtotal:</strong>
          </p>
          <p className="level-item">
            ${Math.floor(subtotal / 100)}.{subtotal.toString().slice(-2)}
          </p>
        </div>
      </div>
      <div className="level">
        <div className="level-left" />
        <div className="level-center" />
        <div className="level-right">
          <button
            type="submit"
            onClick={evt => evt.preventDefault()}
            className="button is-large"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart

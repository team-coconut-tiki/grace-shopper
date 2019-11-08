import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchUserCart, removeFromCartThunk, updateCartThunk} from '../store'
import {dollarsInDollars} from '../../Utilities'
import {Link} from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.singleUser)
  const cartItems = useSelector(state => state.carts.currentCarts)

  useEffect(
    () => {
      dispatch(fetchUserCart(user.id))
    },
    [user]
  )

  const subtotal = cartItems.reduce((acc, cur) => {
    acc += cur.cart_item.priceInCents * cur.cart_item.quantity
    return acc
  }, 0)

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map(item => {
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
                  value={item.cart_item.quantity}
                  onChange={evt => {
                    dispatch(
                      updateCartThunk(user.id, item.id, +evt.target.value)
                    )
                  }}
                />
              </p>
              <p className="level-item">
                ${dollarsInDollars(item.cart_item.priceInCents)}
              </p>
              <span
                className="icon button"
                onClick={() => dispatch(removeFromCartThunk(user.id, item.id))}
              >
                <i className="fas fa-trash" />
              </span>
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
          <p className="level-item">${dollarsInDollars(subtotal)}</p>
        </div>
      </div>
      <div className="level">
        <div className="level-left" />
        <div className="level-center" />
        <div className="level-right">
          <Link to="/checkout">
            <button
              type="button"
              onClick={evt => evt.preventDefault()}
              className="button is-large"
            >
              <span className="icon">
                <i className="fas fa-shopping-bag" />
              </span>
              <p>Complete Order</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart

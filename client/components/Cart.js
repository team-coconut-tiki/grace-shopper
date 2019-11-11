import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  fetchUserCart,
  removeFromCartThunk,
  updateCartThunk,
  updateSessionCartThunk,
  createOrderThunk,
  checkoutThunk
} from '../store'
import {dollarsInDollars} from '../../Utilities'
var stripe = Stripe('pk_test_pReitL4ywW7aWvUlEbjYeiFO00sZCjLWB7')

const Cart = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  const cartItems = useSelector(state => state.carts.currentCarts)
  const sessionId = useSelector(state => state.stripe.sessionId)

  const subtotal = cartItems.reduce((acc, cur) => {
    acc += cur.cart_item.priceInCents * cur.cart_item.quantity
    return acc
  }, 0)

  const lineItems = cartItems.map(item => {
    return {
      amount: item.priceInCents,
      currency: 'usd',
      name: item.title,
      quantity: item.cart_item.quantity
    }
  })

  useEffect(() => {
    dispatch(checkoutThunk(lineItems))
  }, [])

  useEffect(
    () => {
      dispatch(fetchUserCart(user.id))
    },
    [user]
  )

  useEffect(
    () => {
      // dispatch(updateSessionCartThunk(sessionId, lineItems))
    },
    [cartItems.length]
  )

  //CHANGE

  //stripe checkout
  function completeOrder(event) {
    event.preventDefault()

    // dispatch(updateSessionCartThunk(sessionId, lineItems))
    dispatch(createOrderThunk(user.id, {subtotal: subtotal}))

    stripe
      .redirectToCheckout({
        sessionId: sessionId
      })
      .then(function(result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      })
      .catch(err => {
        console.error(err)
      })
  }

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
                onClick={() => {
                  dispatch(removeFromCartThunk(user.id, item.id))
                }}
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
          <button
            type="button"
            onClick={evt => completeOrder(evt)}
            className="button is-large"
          >
            <span className="icon">
              <i className="fas fa-shopping-bag" />
            </span>
            <p>Checkout</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart

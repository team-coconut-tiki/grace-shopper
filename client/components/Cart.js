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

  const subtotal = cartItems
    ? cartItems.reduce((acc, cur) => {
        acc += cur.priceInCents * cur.quantity
        return acc
      }, 0)
    : 0

  const lineItems = cartItems
    ? cartItems.map(item => {
        return {
          amount: item.priceInCents,
          currency: 'usd',
          name: item.title,
          quantity: item.quantity
        }
      })
    : []

  useEffect(() => {
    dispatch(checkoutThunk(lineItems))
  }, [])

  useEffect(
    () => {
      user.id && dispatch(fetchUserCart(user.id))
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
        // console.log(result)
        console.log('payment completed')
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map(item => {
        if (!item.orderId) {
          return (
            <li className="level" key={item.product.id}>
              <div className="level-left">
                <figure className="image is-64x64 level-item">
                  <img src={item.product.imageUrl} />
                </figure>
                <strong className="level-item">{item.product.title}</strong>
              </div>
              <div className="level-right">
                <p className="level-item">
                  x{'  '}
                  <input
                    type="number"
                    className="input is-rounded"
                    value={item.quantity}
                    onChange={evt => {
                      console.log(
                        'upd',
                        user.id,
                        item.productId,
                        evt.target.value
                      )
                      dispatch(
                        updateCartThunk(
                          user.id,
                          item.productId,
                          +evt.target.value
                        )
                      )
                    }}
                  />
                </p>
                <p className="level-item">
                  ${dollarsInDollars(item.priceInCents)}
                </p>
                <span
                  className="icon button"
                  onClick={() => {
                    dispatch(removeFromCartThunk(user.id, item.product.id))
                  }}
                >
                  <i className="fas fa-trash" />
                </span>
              </div>
            </li>
          )
        } else return ''
      })}
      <div className="level">
        <div className="level-left" />
        <div className="level-center" />
        <div className="level-right">
          <p className="level-item">
            <strong>Subtotal:</strong>
          </p>
          <p className="level-item">$</p>
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

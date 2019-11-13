import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderThunk, updateOrderStatusThunk} from '../store'
import {dollarsInDollars} from '../../Utilities'
import {Link} from 'react-router-dom'

const SingleOrder = props => {
  const dispatch = useDispatch()
  const order = useSelector(state => state.singleOrder.order)
  const thisOrderId = props.match ? +props.match.params.id : props.orderId
  useEffect(() => {
    dispatch(getOrderThunk(thisOrderId))
  }, [])
  return (
    <div className="columns">
      <div className="container box column">
        <h4 className="title">Orders</h4>
        <ul>
          {!order.id ? (
            'no order exists'
          ) : (
            <div className="columns">
              <span className="column is-one-fifth">
                {!order.user.isAdmin ? (
                  'Product'
                ) : (
                  <Link to="/users">Customer: {order.user.email}</Link>
                )}
              </span>
              <span className="column is-one-fifth">
                {!order.user.isAdmin ? (
                  `Order ID: ${order.id}`
                ) : (
                  <Link to="/orders">Order Number: {order.id}</Link>
                )}
              </span>
              <span className="column">
                {'Order Status: '}
                {!order.user.isAdmin ? (
                  order.status
                ) : (
                  <div className="select">
                    <select
                      onChange={evt =>
                        dispatch(
                          updateOrderStatusThunk(order.id, evt.target.value)
                        )
                      }
                    >
                      <option>{order.status}</option>
                      <option>open</option>
                      <option>paid</option>
                      <option>shipped</option>
                      <option>completed</option>
                      <option>cancelled</option>
                    </select>
                  </div>
                )}
              </span>
              <span className="column">
                Order Subtotal: ${dollarsInDollars(order.subtotalInCents)}
              </span>
            </div>
          )}
          <hr />
          {!order.user
            ? 'no user for order'
            : order.cart_items.map(cart => {
                return (
                  <li key={cart.id} className="columns">
                    <span className="column">
                      {!order.user.isAdmin ? '' : 'Title: '}
                      {cart.product.title}
                    </span>
                    <span className="column">
                      Quantity: {cart.product.inventory}
                    </span>
                    <span className="column">
                      Price: ${dollarsInDollars(cart.product.priceInCents)}
                    </span>
                    <span className="column">
                      <img
                        src={cart.product.imageUrl}
                        className="image product-image"
                      />
                    </span>
                  </li>
                )
              })}
        </ul>
      </div>
    </div>
  )
}

export default SingleOrder

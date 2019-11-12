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
            : order.user.products.map(product => {
                return (
                  <li key={product.id} className="columns">
                    <span className="column">
                      {!order.user.isAdmin ? '' : 'Title: '}
                      {product.title}
                    </span>
                    <span className="column">
                      Quantity: {product.cart_item.quantity}
                    </span>
                    <span className="column">
                      Price: ${dollarsInDollars(product.cart_item.priceInCents)}
                    </span>
                    <span className="column">
                      <img
                        src={product.imageUrl}
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

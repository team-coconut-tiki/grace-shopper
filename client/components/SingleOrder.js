import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderThunk} from '../store'
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
    <ul>
      {!order.id ? (
        'no order exists'
      ) : (
        <div className="columns">
          <span className="column">
            <Link to="/users">Customer: {order.user.email}</Link>
          </span>
          <span className="column">
            <Link to="/orders">
              Order Number: {order.id}
              {console.log(order)}
            </Link>
          </span>

          <span className="column">Order Status: {order.status}</span>
          <div className="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
          <span className="column">
            Order Subtotal: ${dollarsInDollars(order.subtotalInCents)}
          </span>
        </div>
      )}

      {!order.user
        ? 'no user for order'
        : order.user.products.map(product => {
            return (
              <li key={product.id} className="columns">
                <span className="column">Title: {product.title}</span>
                <span className="column">
                  Quantity: {product.cart_item.quantity}
                </span>
                <span className="column">
                  Price: ${dollarsInDollars(product.cart_item.priceInCents)}
                </span>
                <span className="column">
                  <img src={product.imageUrl} className="image product-image" />
                </span>
              </li>
            )
          })}
    </ul>
  )
}

export default SingleOrder

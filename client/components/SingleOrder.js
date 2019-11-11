import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderThunk} from '../store'
import {dollarsInDollars} from '../../Utilities'
import {Link} from 'react-router-dom'

const SingleOrder = props => {
  const dispatch = useDispatch()
  const order = useSelector(state => state.singleOrder.order)
  console.log(props)
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
          <Link to="/orders" className="column">
            <span>Order Number: {order.id}</span>
          </Link>
          <span className="column">
            Order Status: {order.status}
            {console.log(order)}
          </span>
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

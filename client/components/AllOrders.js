import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrdersThunk} from '../store/allOrders'
import {Link} from 'react-router-dom'
import {dollarsInDollars} from '../../Utilities'

const AllOrders = props => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.allOrders.orders)
  useEffect(() => {
    dispatch(getOrdersThunk())
  }, [])

  return (
    <div className="columns">
      <div className="container box column">
        <h1 className="title">Orders</h1>
        <div className="columns title is-4">
          <div className="column">ID</div>
          <div className="column">Email</div>
          <div className="column">Order Status</div>
          <div className="column">Subtotal</div>
        </div>
        <hr />
        <ul>
          {!orders
            ? 'No orders'
            : orders.map(order => {
                return (
                  <li key={order.id} className="columns">
                    <span className="column">
                      <Link to={`/orders/${order.id}`}>
                        Order ID: {order.id}
                      </Link>
                    </span>
                    <span className="column">
                      <Link to={`/users/${order.user.id}/orders`}>
                        User ID: {order.user.id} Email: {order.user.email}
                      </Link>
                    </span>
                    <span className="column">Status: {order.status}</span>
                    <span className="column">
                      SubTotal:$
                      {dollarsInDollars(order.subtotalInCents)}
                    </span>
                  </li>
                )
              })}
        </ul>
      </div>
    </div>
  )
}

export default AllOrders

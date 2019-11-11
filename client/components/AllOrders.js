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
    <ul>
      {!orders
        ? 'No orders'
        : orders.map(order => {
            return (
              <li key={order.id} className="columns">
                <span className="column">
                  <Link to={`/orders/${order.id}`}>Order ID: {order.id}</Link>
                </span>
                <span className="column">
                  {/* User ID: {order.userId} Email: {order.user.email} */}
                </span>
                <span className="column">Status: {order.status}</span>
                <span className="column" />SubTotal:$
                {dollarsInDollars(order.subtotalInCents)}
                <span />
              </li>
            )
          })}
    </ul>
  )
}

export default AllOrders

import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrdersThunk} from '../store/allOrders'
import userHome from './user-home'

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
                <span className="column">Order ID: {order.id}</span>
                <span className="column">User ID: {order.userId}</span>
                <span className="column">Status: {order.status}</span>
                <span className="column" />SubTotal:
                {(order.subtotalInCents / 100)
                  .toString()
                  .slice(-2)}.{order.subtotalInCents.toString().slice(-2)}
                <span />
              </li>
            )
          })}
    </ul>
  )
}

export default AllOrders

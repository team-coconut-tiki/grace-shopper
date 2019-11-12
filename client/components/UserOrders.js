import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserOrdersThunk} from '../store/userOrders'
import SingleOrder from './SingleOrder'

const UserOrders = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userOrders.orders)

  const thisUserId = props.match ? +props.match.params.id : props.userId
  useEffect(() => {
    dispatch(getUserOrdersThunk(thisUserId))
  }, [])
  return (
    <ul>
      {!user.orders || user.orders.length < 1
        ? 'no orders'
        : user.orders.map(order => {
            return <SingleOrder key={order.id} orderId={order.id} />
          })}
    </ul>
  )
}

export default UserOrders

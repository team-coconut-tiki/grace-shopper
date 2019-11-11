import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserOrdersThunk} from '../store/userOrders'
import SingleOrder from './SingleOrder'

const UserOrders = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userOrders.orders)
  console.log('Props', props)
  const thisUserId = +props.match.params.id
  useEffect(() => {
    dispatch(getUserOrdersThunk(thisUserId))
  }, [])
  return (
    <ul>
      {/* {console.log(user)} */}
      {!user.orders
        ? 'no orders'
        : user.orders.map(order => {
            return <SingleOrder key={order.id} orderId={order.id} />
          })}
    </ul>
  )
}

export default UserOrders

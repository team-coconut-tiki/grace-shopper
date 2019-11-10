import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderThunk} from '../store'

const SingleOrder = props => {
  const dispatch = useDispatch()
  const order = useSelector(state => state.singleOrder.order)

  const thisOrderId = +props.match.params.id
  useEffect(() => {
    dispatch(getOrderThunk(thisOrderId))
  }, [])
  return <div>{console.log(order)}</div>
  // <ul>
  //   {!order.cart_items
  //     ? 'no order exists'
  //     : order.cart_items.map(cart => {
  //         return (
  //           <li key={cart.productId}>
  //             <span className="column">Order Status: {order.status}</span>
  //             <span className="column">Quantity: {cart.quantity}</span>
  //             <span className="column" />
  //           </li>
  //         )
  //       })}
  // </ul>
}

export default SingleOrder

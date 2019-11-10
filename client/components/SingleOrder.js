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
  return (
    <ul>
      {console.log(order)}
      {/* {!order
        ? 'no order exists'
        : order.products.map(product => {
            return (
              <li key={product.id}>
                <span className="column">Order Status: {order.status}</span>
                <span className="column">Quantity: {product.quantity}</span>
                <span className="column" />
              </li>
            )
          })} */}
    </ul>
  )
}

export default SingleOrder

import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

const AllOrders = props => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.allOrders.orders)
}

export default AllOrders

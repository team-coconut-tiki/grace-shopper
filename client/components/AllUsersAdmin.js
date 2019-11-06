import React from 'react'

import {useSelector, useDispatch} from 'react-redux'

const AllUsersAdmin = props => {
  const allUsers = useSelector(state => state.allUsers)
  const dispatch = useDispatch()
  return <div>Hello</div>
}

export default AllUsersAdmin

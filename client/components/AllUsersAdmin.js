import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getUsersThunk} from '../store/allUsersAdmin'

const AllUsersAdmin = props => {
  const allUsers = useSelector(state => state.allUsersAdmin.allUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [])

  return (
    <ul>
      {!allUsers
        ? 'No users'
        : allUsers.map(user => {
            return (
              <li key={user.id}>
                <span>
                  ID: {user.id} {user.email}
                  <Link to={`/user/${user.id}`}>
                    <i className="fas fa-user-edit" />
                  </Link>
                </span>
                <span>
                  reset password <i className="fas fa-key" />
                </span>
                <span>
                  order status <i className="fas fa-truck" />
                </span>
                <span>
                  make admin <i className="fas fa-user-tie" />
                </span>
                <span>
                  delete user <i className="fas fa-trash" />
                </span>
              </li>
            )
          })}
    </ul>
  )
}

export default AllUsersAdmin

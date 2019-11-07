import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getUsersThunk, adminDeleteUser} from '../store/allUsersAdmin'

const AllUsersAdmin = props => {
  const allUsers = useSelector(state => state.allUsersAdmin.allUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [])

  console.log(allUsers)
  return (
    <ul>
      {!allUsers
        ? 'No users'
        : allUsers.map(user => {
            return (
              <li key={user.id} className="columns">
                <span className="column">
                  ID: {user.id} {user.email}
                  <Link to={`/users/${user.id}`}>
                    <i className="fas fa-user-edit" />
                  </Link>
                </span>
                <span className="column">
                  reset password<i className="fas fa-key" />
                </span>
                <span className="column">
                  orders:{user.orders.length}
                  <i className="fas fa-truck" />
                </span>
                <span className="column">
                  admin status: {user.isAdmin ? ' Admin ' : ' no '}
                  <i className="fas fa-user-tie" />
                </span>
                <span>
                  delete user
                  <a
                    onClick={() => {
                      dispatch(adminDeleteUser(user.id))
                    }}
                  >
                    <i className="fas fa-trash" />
                  </a>
                </span>
                <hr />
              </li>
            )
          })}
    </ul>
  )
}

export default AllUsersAdmin

import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {
  getUsersThunk,
  adminDeleteUser,
  switchAdminStatus
} from '../store/allUsersAdmin'

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
                  orders:{user.orders ? user.orders.length : 0}
                  <Link to={`/users/${user.id}/orders`}>
                    <i className="fas fa-truck" />
                  </Link>
                </span>
                <span className="column">
                  admin status:
                  <a
                    onClick={() => {
                      dispatch(switchAdminStatus(user.id))
                    }}
                  >
                    {/* <i
                      className={
                        user.isAdmin ? 'fas fa-user-tie' : 'fas fa-times-circle'
                      }
                    /> */}
                    {user.isAdmin ? 'ADMIN' : 'NO'}
                    {/* {user.isAdmin ? 'im an admin fam' : 'not an admin, sadface'} */}
                  </a>
                </span>
                <span className="column">
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

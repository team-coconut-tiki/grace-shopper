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
  //const toggle = useSelector(state => state.allUsersAdmin.toggle)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [])

  useEffect(() => {})

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
                  admin status:
                  <a
                    onClick={() => {
                      dispatch(switchAdminStatus(user.id, user.isAdmin))
                    }}
                  >
                    {user.isAdmin ? (
                      <i className="fas fa-user-tie" />
                    ) : (
                      <i className=" fas fa-times-circle " />
                    )}
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

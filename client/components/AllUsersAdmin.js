/* eslint-disable no-alert */
import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {
  getUsersThunk,
  adminDeleteUserThunk,
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
                  {user.orders ? user.orders.length : 0} order(s)
                  <Link to={`/users/${user.id}/orders`}>
                    <i className="fas fa-truck" />
                  </Link>
                </span>
                <span className="column">
                  admin status:
                  <div className="buttons has-addons">
                    <button
                      type="button"
                      className={
                        user.isAdmin
                          ? 'button is-success is-selected'
                          : 'button is-danger is-selected'
                      }
                      onClick={() => {
                        dispatch(switchAdminStatus(user.id))
                      }}
                    >
                      {user.isAdmin ? 'ADMIN' : 'NO'}
                    </button>
                  </div>
                </span>
                <span className="column">
                  delete user
                  <a
                    onClick={() => {
                      if (user.isAdmin)
                        alert(
                          `${
                            user.email
                          } is an Admin. Please demote Admin status to delete this account.`
                        )
                      else {
                        const yesDelete = confirm(
                          `Press OK to delete ${user.email}`
                        )
                        if (yesDelete) dispatch(adminDeleteUserThunk(user.id))
                      }
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

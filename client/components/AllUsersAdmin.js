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
    <div className="columns">
      <div className="container box column">
        <h1 className="title">Users</h1>
        <div className="columns title is-4">
          <div className="column">Edit User Info</div>
          <div className="column">Reset Password</div>
          <div className="column">Orders</div>
          <div className="column">Admin Status</div>
          <div className="column">Delete User</div>
        </div>
        <hr />
        <ul>
          {!allUsers
            ? 'No users'
            : allUsers.map(user => {
                return (
                  <li key={user.id} className="columns">
                    <span className="column">
                      {user.email}
                      <Link to={`/users/${user.id}`}>
                        <i className="fas fa-user-edit" />
                      </Link>
                    </span>
                    <span className="column">
                      reset<i className="fas fa-key" />
                    </span>
                    <span className="column">
                      {user.orders ? user.orders.length : 0} order(s)
                      <Link to={`/users/${user.id}/orders`}>
                        <i className="fas fa-truck" />
                      </Link>
                    </span>
                    <span className="column">
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
                          {user.isAdmin ? 'ADMIN' : 'USER'}
                        </button>
                      </div>
                    </span>
                    <span className="column">
                      delete
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
                            if (yesDelete)
                              dispatch(adminDeleteUserThunk(user.id))
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
      </div>
    </div>
  )
}

export default AllUsersAdmin

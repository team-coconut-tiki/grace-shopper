import axios from 'axios'

//action types
const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'
const ADMIN_STATUS = 'ADMIN_STATUS'

//action creators
const getUsers = users => ({type: GET_ALL_USERS, users})
const adminDeleteUser = id => ({type: DELETE_USER, id})
const adminStatus = user => ({type: ADMIN_STATUS, user})

//thunk creators
export const getUsersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('api/users/admin')
    dispatch(getUsers(data))
  } catch (err) {
    console.error('error getting all users for admin', err)
  }
}

export const adminDeleteUserThunk = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(adminDeleteUser(userId))
  } catch (err) {
    console.error(err)
  }
}

export const switchAdminStatus = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    // console.log('THUNK DATA', data)
    data.isAdmin = !data.isAdmin
    await axios.put(`/api/users/${userId}`, {isAdmin: data.isAdmin})
    dispatch(adminStatus(data))
  } catch (error) {
    console.error(error)
  }
}

//initial state
const initialState = {
  allUsers: []
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, allUsers: action.users}
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter(user => action.id !== user.id)
      }
    case ADMIN_STATUS:
      return {
        ...state,
        allUsers: state.allUsers.map(user => {
          if (user.id === action.user.id) {
            return action.user
          } else {
            return user
          }
        })
      }
    default:
      return state
  }
}

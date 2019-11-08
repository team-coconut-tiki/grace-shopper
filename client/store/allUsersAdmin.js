import axios from 'axios'

//action types
const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'
const ADMIN_STATUS = 'ADMIN_STATUS'

//action creators
const getUsers = users => ({type: GET_ALL_USERS, users})
const deleteUser = id => ({type: DELETE_USER, id})
const adminStatus = (id, toggle) => ({type: ADMIN_STATUS, id, toggle})

//thunk creators
export const getUsersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('api/users/admin')
    dispatch(getUsers(data))
  } catch (err) {
    console.error('error getting all users for admin', err)
  }
}

export const adminDeleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(deleteUser(userId))
  } catch (err) {
    console.error(err)
  }
}

export const switchAdminStatus = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    const opposite = !data.isAdmin
    await axios.put(`/api/users/${userId}`, {isAdmin: opposite})
    console.log(data)

    dispatch(adminStatus(data))
  } catch (error) {
    console.error(error)
  }
}

//initial state
const initialState = {
  allUsers: [],
  toggle: true
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
      console.log('ACTION.ID', action.id)
      return {...state, toggle: !state.toggle}
    default:
      return state
  }
}

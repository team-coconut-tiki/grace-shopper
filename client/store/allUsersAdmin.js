import axios from 'axios'

//action types
const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'

//action creators
const getUsers = users => ({type: GET_ALL_USERS, users})
const deleteUser = id => ({type: DELETE_USER, id})

//thunk creators
export const getUsersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('api/users/admin')
    //console.log(data)
    dispatch(getUsers(data))
  } catch (err) {
    console.error('error getting all users for admin', err)
  }
}

export const adminDeleteUser = userId => async dispatch => {
  try {
    console.log('got to thunk')
    await axios.delete(`/api/users/${userId}`)
    dispatch(deleteUser(userId))
  } catch (err) {
    console.error(err)
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
    default:
      return state
  }
}

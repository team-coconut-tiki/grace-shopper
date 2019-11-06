import axios from 'axios'

//action types
const GET_ALL_USERS = 'GET_ALL_USERS'

//action creators
const getUsers = users => ({type: GET_ALL_USERS, users})

//thunk creators
export const getUsersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/users/admin')
    dispatch(getUsers(data))
  } catch (err) {
    console.error('error getting all users for admin', err)
  }
}

//initial state
const allUsers = []

//reducer
export default function(state = allUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers
    default:
      return state
  }
}

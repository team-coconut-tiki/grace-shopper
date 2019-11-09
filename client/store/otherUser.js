import axios from 'axios'

const defaultOtherUser = {}

const GET_OTHER_USER = 'GET_OTHER_USER'
const DELETE_OTHER_USER = 'DELETE_OTHER_USER'

const getOtherUser = user => ({type: GET_OTHER_USER, user})
const deleteOtherUser = () => ({type: DELETE_OTHER_USER})

export const getOtherUserThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    if (!data) {
      throw new Error('Unable to get user')
    }
    dispatch(getOtherUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateOtherUserThunk = user => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${user.id}`, user)
    if (!data) {
      throw new Error('Unable to get user')
    }
    dispatch(getOtherUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteOtherUserThunk = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(deleteOtherUser())
  } catch (e) {
    console.error(e)
  }
}

export default function(state = defaultOtherUser, action) {
  switch (action.type) {
    case GET_OTHER_USER:
      return action.user
    case DELETE_OTHER_USER:
      return defaultOtherUser
    default:
      return state
  }
}

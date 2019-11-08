import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {email: ''}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const createUserThunk = user => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${user.id}`, user)
    if (!data) {
      throw new Error('Unable to create user')
    }
    dispatch(getUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const getUserThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    if (!data) {
      throw new Error('Unable to get user')
    }
    dispatch(getUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateUserThunk = user => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${user.id}`, user)
    if (!data) {
      throw new Error('Unable to get user')
    }
    dispatch(getUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
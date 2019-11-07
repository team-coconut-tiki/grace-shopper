import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

/**
 * INITIAL STATE
 */
const initialState = {
  list: []
}

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_ALL_CATEGORIES, categories})

/**
 * THUNK CREATORS
 */
export const getAllCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories')
    dispatch(getCategories(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {...state, list: action.categories}
    default:
      return state
  }
}

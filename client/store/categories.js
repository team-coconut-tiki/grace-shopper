import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'
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
const addNewCategory = category => ({type: ADD_NEW_CATEGORY, category})

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

export const addNewCategoryThunk = category => async dispatch => {
  try {
    const res = await axios.post('/api/categories', category)
    dispatch(addNewCategory(res.data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {...state, list: action.categories}
    case ADD_NEW_CATEGORY:
      return {...state, list: [...state.list, action.category]}
    default:
      return state
  }
}

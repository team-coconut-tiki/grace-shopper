import axios from 'axios'

const GET_PRODUCTS_PER_PAGE = 'GET_PRODUCTS_PER_PAGE'

const initialState = {
  pageNumber: 1,
  products: [],
  numOfPages: 1
}

export const getProductsPerPage = state => ({
  type: GET_PRODUCTS_PER_PAGE,
  state
})

export const getProductsPerPageThunk = query => async dispatch => {
  try {
    const pageNumber = query.split('?')[0]
    const {data} = axios.get(`/api/products/page/${query}`)
    const numOfPages = data.pages
    const products = data.products
    dispatch(getProductsPerPage({pageNumber, numOfPages, products}))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  if (action.type === GET_PRODUCTS_PER_PAGE) {
    return action.state
  } else {
    return state
  }
}

import axios from 'axios'

const GET_PRODUCTS_PER_PAGE = 'GET_PRODUCTS_PER_PAGE'

const initialState = {
  pageNumber: 1,
  products: [],
  numOfPages: 1,
  query: ''
}

export const getProductsPerPage = state => ({
  type: GET_PRODUCTS_PER_PAGE,
  state
})

export const getProductsPerPageThunk = (
  query,
  changed = false,
  reset = false
) => async (dispatch, getState) => {
  try {
    const pageNumber = query.split('?')[0] ? query.split('?')[0] : ''
    query += changed ? '&changed=' + String(changed) : ''
    if (reset) {
      query = '1'
    }
    const {data} = await axios.get(`/api/products/page/${query}`)
    const numOfPages = data.pages
      ? data.pages
      : getState().productsPage.numOfPages
    const products = data.products
    dispatch(getProductsPerPage({pageNumber, numOfPages, products, query}))
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

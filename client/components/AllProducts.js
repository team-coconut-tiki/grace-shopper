import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getAllProducts,
  getAllCategories,
  addToCartThunk,
  createUserThunk,
  getProductsPerPageThunk
} from '../store'
import ProductCard from './ProductCard'
import ProductNav from './ProductNav'
import queryString from 'query-string'
import ReactPaginate from 'react-paginate'

const AllProducts = props => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.allProducts.products)
  const productsOnPage = useSelector(state => state.productsPage.products)
  const categories = useSelector(state => state.categories.list)
  const pageState = useSelector(state => state.productsPage)

  const user = useSelector(state => state.currentUser)
  const query = queryString.parse(props.location.search)
  const locationQuery = props.location.search.split('?')[1]
    ? '?' + props.location.search.split('?')[1]
    : ''
  const route = props.match.params.id ? props.match.params.id : 1
  let pageStateQuery
  if (props.location.search) {
    pageStateQuery = props.location.search
  } else {
    pageStateQuery = ''
  }
  const location = route + pageStateQuery

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
    dispatch(getProductsPerPageThunk(location))
  }, []) //equivalent to componentDidMount

  useEffect(
    () => {
      // set the location equal to the route and query
      // take any auto-changed quotes and make sure api request uses quotes
      dispatch(getProductsPerPageThunk(location, true))
      props.history.push(location)
    },
    [props.location.pathname, props.location.search]
  )

  function handlePageChange(data) {
    const page = data.selected + 1
    const location = page + locationQuery
    dispatch(getProductsPerPageThunk(location, true))
    props.history.push(location)
  }

  function addToCart(product) {
    if (!user.id) {
      dispatch(createUserThunk({}))
    }
    dispatch(addToCartThunk(user.id, product.id, product.priceInCents))
  }

  return (
    <>
      <div className="columns">
        <div className="column is-one-fifth">
          <ProductNav categories={categories} query={query} />
        </div>
        <div className="container box column">
          <h1 className="title">
            {query.category ? 'Results' : 'All Products'}
            {/* fix later */}
          </h1>
          <div className="columns is-mobile is-multiline">
            {productsOnPage ? (
              productsOnPage.reduce((accu, cur) => {
                const mappedProductCategories = cur.categories
                  ? cur.categories.map(category => category.type)
                  : []
                if (
                  !query.category ||
                  mappedProductCategories.includes(query.category)
                ) {
                  accu.push(
                    <div className="column is-one-fifth" key={cur.id}>
                      <Link to={`/products/${cur.id}`} key={cur.id}>
                        <ProductCard key={cur.id} product={cur} />
                      </Link>
                    </div>
                  )
                }
                return accu
              }, [])
            ) : (
              <p>no products</p>
            )}
          </div>
        </div>
      </div>
      <div
        className="column is-half
is-offset-one-quarter"
      >
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pageState.numOfPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination box"
          subContainerClassName="pages"
          activeClassName="active button"
          initialPage={+route - 1}
        />
      </div>
    </>
  )
}

export default AllProducts

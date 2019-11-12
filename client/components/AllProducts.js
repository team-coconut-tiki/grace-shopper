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
  const route = props.match.params.id

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
  }, []) //equivalent to componentDidMount

  useEffect(
    () => {
      console.log(props.location.search)
      dispatch(
        getProductsPerPageThunk(
          route +
            (props.location.search
              ? props.location.search
              : '?' + pageState.query.split('?')[1])
        )
      )
      // dispatch(getProductsPerPageThunk('2?category=Coconuts&order=[["priceInCents","asc"]]'))
    },
    [props.location]
  )

  function handlePageChange(data) {
    console.log(data)
    data.selected++
    console.log(props.location.search.split('?')[1])
    const location = data.selected + '?' + props.location.search.split('?')[1]
    dispatch(getProductsPerPageThunk(location))
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
              // products.reduce((acc, product) => {
              // const mappedProductCategories = product.categories.map(
              //   category => category.type
              // )
              // if (!query || mappedProductCategories.includes(query.category)) {
              //   acc.push(
              //     <div className="column is-one-fifth" key={product.id}>
              //       <Link to={`/products/${product.id}`} key={product.id}>
              //         <ProductCard key={product.id} product={product} />
              //       </Link>
              //     </div>
              //     )
              //   }
              // }, [])
              <p>no products</p>
            )}
          </div>
        </div>
      </div>
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageState.numOfPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
        initialPage={+route - 1}
      />
    </>
  )
}

export default AllProducts

import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getAllProducts,
  getAllCategories,
  addToCartThunk,
  createUserThunk
} from '../store'
import ProductCard from './ProductCard'
import ProductNav from './ProductNav'
import queryString from 'query-string'

const AllProducts = props => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.allProducts.products)
  const categories = useSelector(state => state.categories.list)

  const user = useSelector(state => state.currentUser)
  // console.log('props', props)
  const query = queryString.parse(props.location.search)

  // console.log('q', query)
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
  }, []) //equivalent to componentDidMount

  function addToCart(product) {
    if (!user.id) {
      dispatch(createUserThunk({}))
    }
    dispatch(addToCartThunk(user.id, product.id, product.priceInCents))
  }

  return (
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
          {products ? (
            products.reduce((accu, cur) => {
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
  )
}

export default AllProducts

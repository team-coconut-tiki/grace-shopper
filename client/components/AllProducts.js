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

const AllProducts = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.allProducts.products)
  const categories = useSelector(state => state.categories.list)

  const user = useSelector(state => state.currentUser)

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
        <ProductNav categories={categories} />
      </div>
      <div className="container box column">
        <h1 className="title">All Products</h1>
        <div className="columns is-mobile is-multiline">
          {products ? (
            products.map(product => {
              return (
                <div className="column is-one-fifth" key={product.id}>
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <ProductCard key={product.id} product={product} />
                  </Link>
                  <button
                    className="button is-small"
                    type="button"
                    onClick={() => addToCart(product)}
                  >
                    <i className="fas fa-cart-plus" />
                  </button>
                </div>
              )
            })
          ) : (
            <p>no products</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllProducts

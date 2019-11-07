import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/allProducts'
import ProductCard from './ProductCard'

const AllProducts = props => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.allProducts.products)

  useEffect(() => {
    dispatch(getAllProducts())
  }, []) //equivalent to componentDidMount

  return (
    <div className="container">
      <h1 className="title">All Products</h1>
      <div className="columns is-mobile is-multiline">
        {products ? (
          products.map(product => {
            return (
              <div className="column is-one-fifth" key={product.id}>
                <Link to={`/products/${product.id}`} key={product.id}>
                  <ProductCard key={product.id} product={product} />
                </Link>
              </div>
            )
          })
        ) : (
          <p>no products</p>
        )}
      </div>
    </div>
  )
}

export default AllProducts

import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {getAllProducts, getAllCategories, deleteProductThunk} from '../store'
import {dollarsInDollars} from '../../Utilities'

const AllProductsAdmin = props => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.allProducts.products)

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
  }, []) //equivalent to componentDidMount

  return (
    <div className="columns">
      <div className="container box column">
        <h1 className="title">All Products</h1>
        <div className="columns title is-5">
          <div className="column">ID</div>
          <div className="column">Title</div>
          <div className="column">Description</div>
          <div className="column">Price</div>
          <div className="column">Quantity</div>
          <div className="column" />
        </div>
        <hr />
        {products ? (
          products.map(product => {
            return (
              <div className="columns" key={product.id}>
                <div className="column">
                  <Link to={`/product-form/${product.id}`}>
                    <span className="icon">
                      <i className="fas fa-edit" />
                    </span>
                  </Link>{' '}
                  {product.id}
                </div>
                <div className="column">
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </div>
                <div className="column">
                  {product.description.slice(0, 12)}...
                </div>
                <div className="column">
                  ${dollarsInDollars(product.priceInCents)}
                </div>
                <div className="column">{product.quantity}</div>
                <div className="column">
                  <span
                    className="icon button"
                    onClick={() => dispatch(deleteProductThunk(product.id))}
                  >
                    <i className="fas fa-trash" />
                  </span>
                </div>
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

export default AllProductsAdmin

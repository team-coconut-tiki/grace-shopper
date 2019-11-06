
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllProducts} from '../store/allproducts'

export const ProductsList = () => {
  const products = useSelector(state => state.products)
  console.log('props', products)
  return (
    <div>
      hi, eventually, this should show products:{' '}
      {products ? products.length : ''}
    </div>
  )
}

const AllProducts = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('hello?')
    dispatch(getAllProducts())
  }, []) //equivalent to componentDidMount

  return (
    <div className="container">
      <h1 className="title">All Products</h1>
      <ul>
        {/* {products ? (
          products.forEach(product => {
            return <li key={product.id}>{product.title}</li>
          })
        ) : (
          <p>no products</p>
        )} */}
        <ProductsList />
      </ul>
    </div>
  )
}

export default AllProducts

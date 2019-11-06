import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllProducts} from '../store/allProducts'

const AllProducts = props => {
  const dispatch = useDispatch()
  const products = useSelector(
    state => state.products,
    () => {
      console.log('help')
    }
  )
  console.log('props', products)

  useEffect(() => {
    console.log('hello?')
    dispatch(getAllProducts())
  }, []) //equivalent to componentDidMount

  return (
    <div className="container">
      <h1 className="title">All Products</h1>
      <ul>
        {products ? products.length : ''}
        {/* {products ? (
          products.forEach(product => {
            return <li key={product.id}>{product.title}</li>
          })
        ) : (
          <p>no products</p>
        )} */}
      </ul>
    </div>
  )
}

export default AllProducts

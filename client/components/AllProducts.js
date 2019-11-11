import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts, getAllCategories} from '../store'
import ProductCard from './ProductCard'
import ProductNav from './ProductNav'
import queryString from 'query-string'

const AllProducts = props => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.allProducts.products)
  const categories = useSelector(state => state.categories.list)

  const query = queryString.parse(props.location.search)

  // console.log('q', Object.keys(query))
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
  }, []) //equivalent to componentDidMount

  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <ProductNav categories={categories} />
      </div>
      <div className="container box column">
        <h1 className="title">
          {Object.keys(query).length ? 'Results' : 'All Products'}
        </h1>
        <div className="columns is-mobile is-multiline">
          {products ? (
            products.reduce((accu, cur) => {
              const mappedProductCategories = cur.categories.map(
                category => category.type
              )
              if (
                !Object.keys(query).length ||
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

import React from 'react'
import {productsPage} from '../store'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const ProductNav = props => {
  // const query = props.query
  const pageNumber = useSelector(state => state.productsPage.pageNumber)
  return (
    <div className="container box">
      <ul className="has-text-centered">
        {props.categories.map(category => {
          // let activeCat = ''
          // if (
          //   query.category === category.type ||
          //   query.category.includes(category.type)
          // ) {
          //   activeCat = 'is-outlined'
          // }
          return (
            <li className="container" key={category.id}>
              <Link
                className={`button is-rounded is-fullwidth is-success cat ${
                  /*activeCat*/ ''
                }`}
                to={`/products/page/${pageNumber}?category=${category.type}`}
              >
                {category.type}
              </Link>
            </li>
          )
        })}
      </ul>
      <hr />
      <p className="subtitle is-4">
        <span className="icon">
          <i className="fas fa-filter" />
        </span>
        Filter
      </p>
      <ul>
        {/* <li>
          <span className="icon">
            <i className="fas fa-star" />
          </span>Rating
        </li> */}
        <li>
          <Link to="/products/page/1?order=[['title','ASC']]">
            <span className="icon">
              <i className="fas fa-sort-alpha-down" />
            </span>A-Z
          </Link>
        </li>
        <li>
          <Link to="/products/page/1?order=[['priceInCents','ASC']]">
            <span className="icon">
              <i className="fas fa-dollar-sign" />
            </span>Price (Low to High)
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ProductNav

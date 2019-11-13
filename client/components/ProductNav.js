import React, {useState} from 'react'
import {productsPage} from '../store'
import {useSelector} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

const ProductNav = props => {
  const [azDirection, setAzDirection] = useState('asc')
  const [priceDirection, setPriceDirection] = useState('asc')
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
                to={`/products/page/1?category=${category.type}`}
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
          <Link to={`/products/page/1?order=[["title","${azDirection}"]]`}>
            <button
              onClick={() => {
                azDirection === 'asc'
                  ? setAzDirection('desc')
                  : setAzDirection('asc')
              }}
            >
              <span className="icon">
                <i className="fas fa-sort-alpha-down" />
              </span>
              {azDirection === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
          </Link>
        </li>
        <li>
          <Link
            to={`/products/page/1?order=[["priceInCents","${priceDirection}"]]`}
          >
            <button
              onClick={() => {
                priceDirection === 'asc'
                  ? setPriceDirection('desc')
                  : setPriceDirection('asc')
              }}
            >
              <span className="icon">
                <i className="fas fa-dollar-sign" />
              </span>Price{' '}
              {priceDirection === 'asc' ? '(Low to High)' : '(High to Low)'}
            </button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(ProductNav)

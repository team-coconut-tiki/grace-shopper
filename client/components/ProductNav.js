import React from 'react'
import {Link} from 'react-router-dom'

const ProductNav = props => {
  return (
    <div className="container box">
      <ul>
        {props.categories.map(category => {
          return (
            <li key={category.id}>
              <Link to="/products">{category.type}</Link>
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
        <li>
          <span className="icon">
            <i className="fas fa-star" />
          </span>Rating
        </li>
        <li>
          <span className="icon">
            <i className="fas fa-sort-alpha-down" />
          </span>A-Z
        </li>
        <li>
          <span className="icon">
            <i className="fas fa-dollar-sign" />
          </span>Price (Low to High)
        </li>
      </ul>
    </div>
  )
}

export default ProductNav

import React from 'react'
import {dollarsInDollars} from '../../Utilities'
const ProductCard = props => {
  return (
    <div className="box">
      <img src={props.product.imageUrl} alt={props.product.id} />
      <p>
        <strong>{props.product.title}</strong>
        <br />
        ${dollarsInDollars(props.product.priceInCents)}
      </p>
    </div>
  )
}

export default ProductCard

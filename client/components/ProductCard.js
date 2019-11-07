import React from 'react'

const ProductCard = props => {
  return (
    <div className="box">
      <img src={props.product.imageUrl} alt={props.product.id} />
      <p>
        <strong>{props.product.title}</strong>
        <br />
        ${props.product.priceInCents /
          100}.{props.product.priceInCents.toString().slice(-2)}
      </p>
    </div>
  )
}

export default ProductCard

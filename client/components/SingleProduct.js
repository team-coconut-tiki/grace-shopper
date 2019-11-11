import React, {useEffect} from 'react'
import {addToCartThunk, fetchProduct, createUserThunk} from '../store'
import {useSelector, useDispatch} from 'react-redux'

const SingleProduct = props => {
  const dispatch = useDispatch()
  const thisProduct = useSelector(state => state.singleProduct.selectedProduct)

  const user = useSelector(state => state.currentUser)
  const thisProductId = +props.match.params.id

  useEffect(() => {
    if (!user.id) {
      dispatch(createUserThunk({}))
    }
    dispatch(fetchProduct(thisProductId))
  }, [])

  function addToCart() {
    dispatch(addToCartThunk(user.id, thisProduct.id, thisProduct.priceInCents))
  }

  return (
    <div id="single-product" className="box">
      {/* <div>Breadcrumb placeholder</div> */}
      <div>Name: {thisProduct.title}</div>
      {/* <div>product tile placeholder</div> */}
      <div>Price: ${thisProduct.priceInCents / 100}</div>
      {/* <h1>Number in Cart: {quantity}</h1> */}

      <p>Description: {thisProduct.description}</p>
      <p>
        Categories:{' '}
        {thisProduct.categories
          ? thisProduct.categories
              .map(category => {
                return category.type
              })
              .join(', ')
          : 'none'}
      </p>
      <button className="button is-medium" type="button" onClick={addToCart}>
        Add to cart
      </button>
      <figure className="image">
        <img src={thisProduct.imageUrl} />
      </figure>
      <div>reviews to come!</div>
    </div>
  )
}

export default SingleProduct

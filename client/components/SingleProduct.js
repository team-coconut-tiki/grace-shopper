import React, {useEffect} from 'react'
import {
  addToCartThunk,
  fetchProduct,
  createUserThunk,
  checkoutThunk
} from '../store'
import {useSelector, useDispatch} from 'react-redux'

const SingleProduct = props => {
  const dispatch = useDispatch()
  const thisProduct = useSelector(state => state.singleProduct.selectedProduct)
  const user = useSelector(state => state.currentUser)
  const cartItems = useSelector(state => state.carts.currentCarts)

  const thisProductId = +props.match.params.id

  useEffect(() => {
    if (!user.id) {
      dispatch(createUserThunk({}))
    }
    dispatch(fetchProduct(thisProductId))
  }, [])

  const lineItems = cartItems.map(item => {
    return {
      amount: item.priceInCents,
      currency: 'usd',
      name: item.title,
      quantity: item.cart_item.quantity
    }
  })

  // grab Reviews

  function addToCart() {
    dispatch(addToCartThunk(user.id, thisProduct.id, thisProduct.priceInCents))
    dispatch(checkoutThunk(lineItems))
  }

  return (
    <div id="single-product" className="box">
      {/* <div>Breadcrumb placeholder</div> */}
      <div>Name: {thisProduct.title}</div>
      {/* <div>product tile placeholder</div> */}
      <div>Price: ${thisProduct.priceInCents / 100}</div>
      {/* <h1>Number in Cart: {quantity}</h1> */}
      <button type="button" onClick={addToCart}>
        Add to cart
      </button>
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
      <figure className="image product-image">
        <img src={thisProduct.imageUrl} />
      </figure>
      <div>reviews to come!</div>
    </div>
  )
}

export default SingleProduct

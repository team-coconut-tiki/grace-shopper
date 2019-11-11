import React, {useEffect} from 'react'
import {
  addToCartThunk,
  fetchProduct,
  createUserThunk,
  checkoutThunk,
  getReviewsByProductThunk
} from '../store'
import {useSelector, useDispatch} from 'react-redux'
import SingleReview from './SingleReview'

const SingleProduct = props => {
  const dispatch = useDispatch()
  const thisProduct = useSelector(state => state.singleProduct.selectedProduct)
  const user = useSelector(state => state.currentUser)
  const cartItems = useSelector(state => state.carts.currentCarts)
  const reviews = useSelector(state => state.allReviews)

  const thisProductId = +props.match.params.id

  useEffect(() => {
    if (!user.id) {
      dispatch(createUserThunk({}))
    }
    dispatch(fetchProduct(thisProductId))
  }, [])
  useEffect(
    () => {
      dispatch(getReviewsByProductThunk(thisProductId))
    },
    [thisProduct]
  )

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

  console.log(reviews)
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
      <div>
        {reviews &&
          reviews.map(review => (
            <SingleReview key={review.id} review={review} />
          ))}
      </div>
    </div>
  )
}

export default SingleProduct

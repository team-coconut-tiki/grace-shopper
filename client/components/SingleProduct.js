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

  function addToCart() {
    dispatch(addToCartThunk(user.id, thisProduct.id, thisProduct.priceInCents))
  }

  console.log(reviews)
  return (
    <div id="single-product" className="container box">
      {/* <div>Breadcrumb placeholder</div> */}
      <figure className="image product-image">
        <img src={thisProduct.imageUrl} />
      </figure>

      <div className="title is-5">{thisProduct.title}</div>
      <div>Price: ${thisProduct.priceInCents}</div>
      <button
        type="button"
        className="button is-success is-rounded"
        onClick={addToCart}
      >
        Add to cart
      </button>
      {/* <div>product tile placeholder</div> */}

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

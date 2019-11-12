import React, {useEffect} from 'react'
import {
  addToCartThunk,
  fetchProduct,
  createUserThunk,
  getReviewsByProductThunk
} from '../store'
import {useSelector, useDispatch} from 'react-redux'
import SingleReview from './SingleReview'

const SingleProduct = props => {
  const dispatch = useDispatch()
  const thisProduct = useSelector(state => state.singleProduct.selectedProduct)

  const user = useSelector(state => state.currentUser)
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

  return (
    <div id="single-product" className="container box">
      <figure className="image product-image">
        <img src={thisProduct.imageUrl} />
      </figure>

      <div className="title is-5">{thisProduct.title}</div>
      <div>Price: ${thisProduct.priceInCents / 100}</div>
      <div>
        Availability: {thisProduct.inventory > 0 ? 'Available' : 'Unavailable'}
      </div>
      {thisProduct.inventory > 0 && (
        <button
          type="button"
          className="button is-success is-rounded"
          onClick={addToCart}
        >
          Add to cart
        </button>
      )}

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

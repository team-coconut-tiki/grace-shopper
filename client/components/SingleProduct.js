import React, {useEffect} from 'react'
import {addToCartThunk, fetchProduct, createUserThunk} from '../store'
import {useSelector, useDispatch} from 'react-redux'

const SingleProduct = props => {
  const dispatch = useDispatch()
  const thisProduct = useSelector(state => state.singleProduct.selectedProduct)
  const user = useSelector(state => state.singleUser)

  const thisProductId = props.location.pathname.split('/')[2]

  useEffect(() => {
    if (!user.id) {
      dispatch(createUserThunk({}))
    }

    dispatch(fetchProduct(thisProductId))
  }, [])
  //same as componentDidMount()

  function addToCart() {
    dispatch(addToCartThunk(user.id, thisProduct.id, thisProduct.priceInCents))
  }

  return (
    <div id="single-product">
      {/* <div>Breadcrumb placeholder</div> */}
      <div>Name: {thisProduct.title}</div>
      {/* <div>product tile placeholder</div> */}
      <div>Price: ${thisProduct.priceInCents / 100}</div>
      {/* <h1>Number in Cart: {quantity}</h1> */}
      <button type="button" onClick={addToCart}>
        Add to cart
      </button>
      <p>Description: {thisProduct.description}</p>
      <img src={thisProduct.imageUrl} />
      <div>reviews to come!</div>
    </div>
  )
}

export default SingleProduct

import React, {useState, useEffect} from 'react'
import {addToCartThunk, fetchProduct, createUserThunk} from '../store'
import {useSelector, useDispatch} from 'react-redux'

const SingleProduct = props => {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const thisProduct = useSelector(state => state.singleProduct.selectedProduct)

  const thisProductId = props.location.pathname.split('/')[2]

  useEffect(() => {
    dispatch(fetchProduct(thisProductId))
  }, []) //same as componentDidMount()

  // function addToCart(){
  // // check if there is a user
  // // createUser thunk

  // }

  function addToCart() {
    // eventually: check who is logged in, and change 10 to userId
    dispatch(addToCartThunk(10, thisProduct.id, 1, thisProduct.priceInCents))
  }

  return (
    <div id="single-product">
      <div>Breadcrumb placeholder</div>
      <div>{thisProduct.title}</div>
      <div>product tile placeholder</div>
      <div>Price: ${thisProduct.priceInCents / 100}</div>

      {/* <h1>Number in Cart: {quantity}</h1> */}
      <button type="button" onClick={addToCart}>
        Add to cart
      </button>

      <p>Description: {thisProduct.description}</p>

      <img src={thisProduct.imageUrl} />
      <div>reviews!</div>
    </div>
  )
}

export default SingleProduct

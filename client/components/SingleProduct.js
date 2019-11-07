import React, {useState, useEffect} from 'react'
import {addToCartThunk, fetchProduct} from '../store/singleProduct'
import {useSelector, useDispatch} from 'react-redux'
import {createUserThunk} from '../store/singleUser'

const SingleProduct = props => {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const thisProduct = useSelector(state => state.singleProduct.selectedProduct)

  const thisProductId = props.location.pathname.split('/')[2]

  useEffect(() => {
    dispatch(fetchProduct(thisProductId))
  }, []) //same as componentDidMount()

  function incrementCart() {
    setQuantity(prevQuantity => prevQuantity + 1)
    dispatch(
      addToCartThunk(1, thisProduct.id, quantity, thisProduct.priceInCents)
    )
  }

  // function addToCart(){
  //check if there is a user
  //createUser thunk
  // }

  return (
    <div id="single-product">
      <div>Breadcrumb placeholder</div>
      <div>{thisProduct.title}</div>
      <div>product tile placeholder</div>
      <div>Price: ${thisProduct.priceInCents / 100}</div>

      <h1>Number in Cart: {quantity}</h1>
      <button type="button" onClick={incrementCart}>
        Add to cart
      </button>

      <p>Description: {thisProduct.description}</p>

      <img src={thisProduct.imageUrl} />
      <div>reviews!</div>
    </div>
  )
}

export default SingleProduct

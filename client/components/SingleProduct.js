import React, {useState, useEffect} from 'react'
import {addToCartThunk, fetchProduct, createUserThunk} from '../store'
import {useSelector, useDispatch} from 'react-redux'

const SingleProduct = props => {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const thisProduct = useSelector(state => state.singleProduct.selectedProduct)

  // REVIEW: how can we get the param as a value?
  const thisProductId = props.location.pathname.split('/')[2]

  //  const [seconds, setCount] = useState(0)
  //  useEffect(() => {
  //    setTimeout(() =>{
  //      setCount(seconds + 1)
  //    }, 1000)
  //  }, [seconds])
  //
  useEffect(() => {
    dispatch(fetchProduct(thisProductId))
    // what if thisProductId changes?
  }, [thisProductId]) //same as componentDidMount()

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
      {/* <div>Breadcrumb placeholder</div> */}
      <div>Name: {thisProduct.title}</div>
      {/* <div>product tile placeholder</div> */}
      <div>Price: ${thisProduct.priceInCents / 100}</div>
      {/* <h1>Number in Cart: {quantity}</h1> */}
      <button type="button" onClick={addToCart}>
        Add to cart
      </button>
      <p>Description: {thisProduct.description}</p>
      <img src="/coconut.png" />
      <div>reviews to come!</div>
    </div>
  )
}

export default SingleProduct

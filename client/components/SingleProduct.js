import React, {useState} from 'react'
import {addToCartThunk} from '../store/singleProduct'
import {useSelector} from 'react-redux'
import {createUserThunk} from '../store/singleUser'

const SingleProduct = props => {
  const [quantity, setQuantity] = useState(0)

  const onChange = event => {
    setQuantity(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const thisUser = useSelector(state => state.singleUser)
    thisUser
      ? addToCartThunk(thisUser.id, props.id, +quantity, props.price)
      : createUserThunk({})
    addToCartThunk(thisUser.id, props.id, +quantity, props.price)
  }

  return (
    <div id="single-product">
      <div>Breadcrumb placeholder</div>
      <div>product tile placeholder</div>

      <form onSubmit={handleSubmit}>
        <select value={quantity} onChange={onChange}>
          <option selectedValue="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button type="button">Add to cart</button>
      </form>

      <div>{props.description}</div>

      <div>
        {props.reviews.map(review => {
          return <li key="review.id">{review}</li>
        })}}
      </div>
    </div>
  )
}

// class SingleProduct extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {quantity: 0}
//   }

//   handleChange(event) {
//     this.setState({quantity: event.target.value})
//   }

//   handleSubmit(event) {
//     event.preventDefault()
//     const thisUser = useSelector(state => state.singleUser)
//     addToCartThunk(
//       thisUser.id,
//       this.props.id,
//       +this.state.quantity,
//       this.props.price
//     )
//   }

//   render() {
//     return (
//       <div id="single-product">
//         <div>Breadcrumb placeholder</div>
//         <div>product tile placeholder</div>

//         <form onSubmit={this.handleSubmit}>
//           <select>
//             <option selectedValue="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//           </select>
//           <button type="button">Add to cart</button>
//         </form>

//         <div>{this.props.description}</div>

//         <div>
//           {this.props.reviews.map(review => {
//             return <li key="review.id">{review}</li>
//           })}}
//         </div>
//       </div>
//     )
//   }
// }

export default SingleProduct

//check if user is logged in (through thunk in the single user)
//return a user or return a new user

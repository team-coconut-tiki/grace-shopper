import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchUserCart, fetchProduct, addToCartThunk} from '../store'
import {dollarsInDollars} from '../../Utilities'

const Cart = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  const cartItems = useSelector(state => state.carts.currentCarts)

  console.log('user', user)
  console.log('cart', cartItems)
  // const [quantity, setQuantity] = useState(0)

  useEffect(
    () => {
      //call getuser thing
      dispatch(fetchUserCart(user.id))
    },
    [user]
  )

  const subtotal = cartItems.reduce((acc, cur) => {
    acc += cur.priceInCents * cur.quantity
    return acc
  }, 0)
  // console.log(cartItems)
  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map(item => {
        return (
          <li className="level" key={item.id}>
            <div className="level-left">
              <figure className="image is-64x64 level-item">
                <img src={item.imageUrl} />
              </figure>
              <strong className="level-item">{item.title}</strong>
            </div>
            <div className="level-right">
              <p className="level-item">
                x{'  '}
                <input
                  type="number"
                  className="input is-rounded"
                  value={item.cart_item.quantity}
                />
              </p>
              <p className="level-item">
                ${dollarsInDollars(item.cart_item.priceInCents)}
              </p>
            </div>
          </li>
        )
      })}
      <div className="level">
        <div className="level-left" />
        <div className="level-center" />
        <div className="level-right">
          <p className="level-item">
            <strong>Subtotal:</strong>
          </p>
          <p className="level-item">${dollarsInDollars(subtotal)}</p>
        </div>
      </div>
      <div className="level">
        <div className="level-left" />
        <div className="level-center" />
        <div className="level-right">
          <button
            type="submit"
            onClick={evt => evt.preventDefault()}
            className="button is-large"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart

// {/* {cartProducts.map((item, i) => {
//           return (
//             <li className="level" key={item.id}>
//               <div className="level-left">
//                 <figure className="image is-64x64 level-item">
//                   <img src={item.imageUrl} />
//                 </figure>
//                 <strong className="level-item">{item.title}</strong>
//               </div>
//               <div className="level-right">
//                 <p className="level-item">
//                   x{'  '}
//                   <input
//                     type="number"
//                     className="input is-rounded"
//                     value={cartItems[i].quantity}
//                   />
//                 </p>
//                 <p className="level-item">
//                   ${Math.floor(cartItems[i].priceInCents / 100)}.{cartItems[
//                     i
//                   ].priceInCents
//                     .toString()
//                     .slice(-2)}
//                 </p>
//               </div>
//             </li>
//           )
//         })} */}

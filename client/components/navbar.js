import React from 'react'
import PropTypes from 'prop-types'
import {connect, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => {
  const cartItems = useSelector(state => state.carts.currentCarts)
  const user = useSelector(state => state.currentUser)
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="level">
          <div className="level-left">
            <Link className="button is-white is-large" to="/">
              <figure className="image is-128x128">
                <img src="/coconut.png" />
              </figure>
              <h1 className="title">Coconuts!</h1>
            </Link>
          </div>
          <div className="level-item has-text-centered">
            <Link className="button is-white" to="/users">
              Users
            </Link>
          </div>
          <div className="level-right">
            <nav>
              {isLoggedIn ? (
                <div>
                  {/* The navbar will show these links after you log in */}
                  <Link className="button" to={`/users/${user.id}`}>
                    My Account
                  </Link>
                  <Link className="button is-white" to="/cart">
                    <span className="icon">
                      <i className="fas fa-shopping-cart" />
                    </span>
                    <p> {cartItems.length} item(s)</p>
                  </Link>
                  <a href="#" className="button" onClick={handleClick}>
                    Logout
                  </a>
                </div>
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <Link className="button" to="/login">
                    Login
                  </Link>
                  <Link className="button is-white" to="/cart">
                    <span className="icon">
                      <i className="fas fa-shopping-cart" />
                    </span>
                    <p> {cartItems.length} item(s)</p>
                  </Link>
                  <Link className="button" to="/signup">
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
          {/* <hr /> */}
        </div>
      </div>
    </section>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.currentUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

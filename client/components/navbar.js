import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
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
          <p>DEV ONLY :::</p>
          <Link className="button is-white" to="/products">
            Products
          </Link>
          <Link className="button is-white" to="/products/1">
            SingleProduct
          </Link>
          <Link className="button is-white" to="/users">
            Users
          </Link>
          <Link className="button is-white" to="/users/1">
            Single User
          </Link>
          <p>::: DEV ONLY</p>
        </div>
        <div className="level-right">
          <nav>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link className="button" to="/home">
                  Home
                </Link>
                <Link className="button is-white" to="/cart">
                  <span className="icon">
                    <i className="fas fa-shopping-cart" />
                  </span>
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
                    <p id="item-count">1 item(s)</p>
                  </span>
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.singleUser.id
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

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <section className="hero is-primary">
    <div className="hero-body">
      <div className="level">
        <div className="level-left">
          <h1 className="title">Coconuts!</h1>
        </div>
        <div className="level-right">
          <nav>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <span className="icon">
                  <i className="fas fa-shopping-cart" />
                </span>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <span className="icon">
                  <i className="fas fa-shopping-cart" />
                </span>
                <Link to="/signup">Sign Up</Link>
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
    isLoggedIn: !!state.user.id
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

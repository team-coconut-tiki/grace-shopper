import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  AllUsersAdmin,
  SingleProduct,
  SingleUser,
  Cart,
  AllOrders,
  Checkout
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/products" component={AllProducts} />
        <Route path="/users/:id" component={SingleUser} />
        <Route path="/users" component={AllUsersAdmin} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={AllOrders} />
        <Route path="/checkout" component={Checkout} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={AllProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.singleUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

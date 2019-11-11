import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  AllProducts,
  AllUsersAdmin,
  SingleProduct,
  SingleUser,
  Cart,
  AllOrders,
  SingleOrder,
  ProductForm,
  AllProductsAdmin,
  NewCategoryForm,
  Success
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
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/products" component={AllProducts} />
        <Route path="/users/:id" component={SingleUser} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders/:id" component={SingleOrder} />
        <Route path="/success" component={Success} />
        {isAdmin && (
          <Switch>
            <Route path="/users" component={AllUsersAdmin} />
            <Route path="/orders" component={AllOrders} />
            <Route path="/product-form/:id" component={ProductForm} />
            <Route path="/product-form/" component={ProductForm} />
            <Route path="/all-products-admin" component={AllProductsAdmin} />
            <Route path="/new-category-form" component={NewCategoryForm} />

            <Route path="/" component={AllProducts} />
          </Switch>
        )}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/" component={AllProducts} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route path="/" component={AllProducts} />
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
    isLoggedIn: !!state.currentUser.id,
    isAdmin: state.currentUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      //load carts from the database
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

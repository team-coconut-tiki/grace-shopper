import React from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/'

const SingleUser = props => {}

export default connect(({singleUser}) => ({singleUser}), {getUserThunk})(
  SingleUser
)

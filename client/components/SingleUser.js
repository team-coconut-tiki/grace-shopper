import React from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/'

const SingleUser = props => {
  return (
    <div>
      this is a placeholder because the app wouldn't run without a return render
      on SingleUser :D
    </div>
  )
}

export default connect(({singleUser}) => ({singleUser}), {getUserThunk})(
  SingleUser
)

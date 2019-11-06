import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import SingleUser from './components/SingleUser'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <SingleUser />
    </div>
  )
}

export default App

import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import UserProfile from './components/UserProfile'
import AllProducts from './components/AllProducts'

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes />
      <UserProfile />
    </div>
  )
}

export default App

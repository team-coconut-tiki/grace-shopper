import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import UserProfile from './components/UserProfile'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <UserProfile />
    </div>
  )
}

export default App

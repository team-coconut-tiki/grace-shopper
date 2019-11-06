import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import SingleProduct from './components/SingleProduct'

const App = () => {
  return (
    <div className="container">
      <Navbar />
      {/* <SingleProduct /> */}
      <Routes />
    </div>
  )
}

export default App

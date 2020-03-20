import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Chat from './components/Chat'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Chat />
    </div>
  )
}

export default App

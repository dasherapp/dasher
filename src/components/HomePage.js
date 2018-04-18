import React from 'react'

import AccountMenu from './AccountMenu'
import Boards from './Boards'

function HomePage() {
  return (
    <div>
      <AccountMenu />
      <h1>Home Page</h1>
      <Boards />
    </div>
  )
}

export default HomePage

import React from 'react'

import PageContainer from './PageContainer'
import AccountMenu from './AccountMenu'
import Boards from './Boards'

function HomePage() {
  return (
    <div>
      <AccountMenu />
      <PageContainer>
        <Boards />
      </PageContainer>
    </div>
  )
}

export default HomePage

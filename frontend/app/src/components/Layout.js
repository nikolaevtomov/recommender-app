import React from 'react'

import TopBar from './TopBar'
import Footer from './Footer'

const Layout = React.memo(props => {
  return (
    <React.Fragment>
      <TopBar {...props} />
        {props.children}
      <Footer />
    </React.Fragment>
  )
})

export default Layout
import * as React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <div className='container'>
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

export default Layout

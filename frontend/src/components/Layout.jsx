import React from 'react'
import Header from './Header'
import {Toaster} from 'react-hot-toast'

function Layout({children}) {
  return (
    <div>
      <Header/>
      <Toaster/>
      {children}
    </div>
  )
}

export default Layout
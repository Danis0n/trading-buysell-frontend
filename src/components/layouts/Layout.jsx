import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { useAuth } from '../hook/useAuth'
import Navbar from '../ui/navbar/Navbar'

const Layout = ({isAuth}) => {

  const {store} = useAuth();

  if (store.isLoading) {
    return <div>Loading</div>
  }

  return (
    <>

    <Navbar isAuth={isAuth}/>
    
    <main>
        <Outlet/>
    </main>
    {/* <Footer/> */}
    </>
  )
}

export default Layout
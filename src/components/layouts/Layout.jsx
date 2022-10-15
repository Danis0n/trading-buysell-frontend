import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/footer/Footer'
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
    <main style={{
      marginBottom: '30px',
    }}>
        <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default Layout
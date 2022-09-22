import React, {useContext} from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Navbar from '../Navbar'
import { useAuth } from '../hook/useAuth'
import NotAuthNavbar from '../NotAuthNavbar'
import { AuthContext } from '../hook/useAuth'

const Layout = () => {

  // TODO : implement navbar of two types - auth&notauth
  const {store} = useAuth();

  console.log(store);
  console.log(store.isAuth);

  return (
    <>
    {store.isAuth ? <Navbar/> : <NotAuthNavbar/>}
    
    <main>
        <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default Layout
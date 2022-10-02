import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { useAuth } from '../hook/useAuth'
import AuthorizedNavbar from '../ui/navbar/AuthorizedNavbar'
import NoAuthorizedNavbar from '../ui/navbar/NoAuthorizedNavbar'

const Layout = ({isAuth}) => {

  // TODO : implement navbar of two types - auth&notauth
  const {store} = useAuth();

  if (store.isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
    {isAuth
     ? 
     <AuthorizedNavbar/>
     :
     <NoAuthorizedNavbar/>
    }
    
    <main>
        <Outlet/>
    </main>
    {/* <Footer/> */}
    </>
  )
}

export default Layout
import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/footer/Footer'
import { useAuth } from '../hook/useAuth'
import Navbar from '../ui/navbar/Navbar'
import {motion} from 'framer-motion';
import { variants } from '../../router/props'

const Layout = ({isAuth}) => {

  const {store} = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  
  if (store.isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
    <Navbar isAuth={isAuth}/>
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.4, type: 'easeInOut' }}
        style={{ position: 'relative' }}
      >
        <main style={{
          marginBottom: '30px',
        }}>
            <Outlet/>
        </main>
      </motion.div>
    <Footer/>
    </>
  )
}

export default Layout
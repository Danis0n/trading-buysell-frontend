import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/footer/Footer'
import { useAuth } from '../hook/useAuth'
import Navbar from '../ui/navbar/Navbar'
import {motion} from 'framer-motion';
import { variants } from '../../router/props'
import { toJS } from 'mobx'
import { isAdmin } from '../../utils/AdminUtil'
import NotifyService from '../../service/NotifyService'

const Layout = ({isAuth}) => {

  const {store} = useAuth();
  const [unViewed, setUnViewed] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    if(store?.user?.id)
      getNotifications(store?.user?.id);
  }, [])
  
  const getNotifications = async (id) => {
    try {
      const response = await NotifyService.getAllUnviewed(id);
      setUnViewed(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const isUserAdmin = () => {
    return store.isAuth && isAdmin(toJS(store?.user?.roles));
  }
  
  if (store.isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
    <Navbar isAuth={isAuth} isAdmin={isUserAdmin()} hasNewNotifications={unViewed}/>
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
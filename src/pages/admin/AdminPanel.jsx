import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/hook/useAuth';
import { toJS } from 'mobx';
import { isAdmin } from '../../utils/AdminUtil';

const AdminPanel = () => {

  const nav = useNavigate();
  const {store} = useAuth();

  const isUserAdmin = () => {
    return store.isAuth && isAdmin(toJS(store?.user?.roles));
  }

  const handleCheck = () => {
    if(!isUserAdmin()) nav('/'); 
  }

  useEffect(() =>{
    const timer = setTimeout(() => handleCheck(), 50);
    return () => clearTimeout(timer);
  })

  return (
    <div style={{
      height: '800px',
      marginTop: '20px',
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
  }}>
    AdminPanel
  </div>
  )
}

export default AdminPanel
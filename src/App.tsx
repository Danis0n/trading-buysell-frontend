import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '.';
import LoginForm from './components/LoginForm';
import Navbar from './components/ui/navbar/Navbar';
import { User } from './model/User';
import UserService from './service/UserService';
import './styles/App.css';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './components/hook/useAuth';

function App() {

  const {store} = useAuth()

  if(store.isLoading){
    return <div>Loading</div>
  }

  return (
    <AppRouter/>
  )
}
  
export default observer(App); 

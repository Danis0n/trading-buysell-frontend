import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '.';
import LoginForm from './components/LoginForm';
import Navbar from './components/ui/navbar/Navbar';
import { User } from './models/User';
import UserService from './service/UserService';
import './styles/App.css';
import AppRouter from './pages/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hook/useAuth';

function App() {

  const {store} = useAuth()
  const [users, setUsers] = useState<User[]>([])

  if(store.isLoading){
    return <div>Loading</div>
  }

  return (
    <AppRouter/>
  )
}
  
export default observer(App); 

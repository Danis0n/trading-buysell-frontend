import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '.';
import LoginForm from './components/LoginForm';
import Navbar from './components/ui/navbar/Navbar';
import { User } from './models/User';
import UserService from './services/UserService';
import './styles/App.css';
import AppRouter from './pages/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hook/useAuth';

function App() {

  const {store} = useAuth()
  const [users, setUsers] = useState<User[]>([])

  async function getUsers(){
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if(store.isLoading){
    return <div>Loading</div>
  }

  // сделать ссылку на страницу логина/регистрации?
  // потом загружать нужный navbar?

  return (
    <AppRouter/>
  )
}
  
export default observer(App); 

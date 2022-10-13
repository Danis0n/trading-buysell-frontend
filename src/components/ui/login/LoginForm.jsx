import React, { FC } from 'react'
import { useState} from 'react'
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../hook/useAuth';
import { Link } from 'react-router-dom';
import cl from './Login.module.css'
import Input from '../input/Input';
import Button from '../button/Button';
import Hr from '../hr/Hr';

const LoginForm = ({handleLogin}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {store} = useAuth();

  const style = {
    width: '250px'
  }

  return (
    <div className={cl.loginForm}>

      <div className={cl.loginWord}>
        Войти
        <Hr/>
      </div>

      <Input
        style={style}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type='text'
        placeholder='Логин'
      />

      <Input
        style={style}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        placeholder='Пароль'
      />

      <Button
       onClick={() => {
        store.login(username,password);
      }}
      >
        Войти
      </Button>

      <div className={cl.registerForm}>
        Нет аккаунта? <Link to='/register' onClick={handleLogin}>Регистрация</Link> 
      </div>

    </div>
  )
}

export default observer(LoginForm)
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

  const {store} = useAuth();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAllowed, setIsAllowed] = useState(true)

  const login = () => {

    let log;

    if(username == '' || password == ''){
      log = false
    }
    else {
      log = true;
    }

    if(log) {
      const response = store.login(username,password).then(function(result){
        if(!!result.name) 
          setIsAllowed(false)   
        else {
          setIsAllowed(true);
          window.location.reload();
        }
      })
    }
  }

  const errorMsg = {
    // margin
    width: '290px',
    color: 'red',
    fontSize: '20px', 
    position: 'absolute'
  }

  const style = {
    width: '250px',
    margin: '20px',
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
       onClick={login}
      >
        Войти
      </Button>

      <div className={cl.registerForm}>
        Нет аккаунта? <Link to='/register' onClick={handleLogin}>Регистрация</Link> 
      </div>
      <div className={cl.registerForm}>
        <Link to='/restore'>Забыли пароль?</Link>
      </div>
      {!isAllowed
      ?
      <div style={errorMsg}>
        Неверный логин и/или пароль
      </div>
      :
      <></>
      }

    </div>
  )
}

export default observer(LoginForm)
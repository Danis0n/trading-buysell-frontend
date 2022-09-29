import React, { FC } from 'react'
import { useState} from 'react'
import { observer } from 'mobx-react-lite';
import { useAuth } from './hook/useAuth';

const LoginForm : FC = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {store} = useAuth();

  return (
    <div>
      <input
        onChange={e => setUsername(e.target.value)}
        value={username}
        type='text'
        placeholder='username'
      />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password'
        placeholder='password'
      />

      <button
       onClick={() => {
        store.login(username, password);
      }}
      >
        Login
      </button>

      <button>Register</button>

    </div>
  )
}

export default observer(LoginForm)
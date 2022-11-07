import React, {useState} from 'react'
import cl from '../../../styles/registration/RegisterUser.module.css'
import { useAuth } from '../../../components/hook/useAuth'
import { API_EMAIL_NOT_VALID, API_USERNAME_NOT_VALID } from '../../../components/http'
import Input from '../../../components/ui/input/Input'
import Button from '../../../components/ui/button/Button'
import Hr from '../../../components/ui/hr/Hr'

const RegisterUser = () => {

    const {store} = useAuth();
    const [isValid, setIsValid] = useState(true);
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const register = async (name, username, password, email, phone) => {
        try {
            const response = await store.register(name,username,password,email,phone);
            if(response.data === API_EMAIL_NOT_VALID ||
               response.data === API_USERNAME_NOT_VALID) {
              setIsValid(false);
            }
            else {
              setIsValid(true);
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        register(name, username, password, email, phone);
    }

    if(store.isLoading){
      return <div>Loading</div>
    }

    const style = {
      width: '350px',
      margin: '20px'
    }

  return (
    <div style={{
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>

      <div className={cl.registerWord}>
        Регистрация
        <Hr/>
      </div>

      <div className={cl.registerForm}>

        <Input
          style={style}
          type='text'
          value={name}
          placeholder='Имя'
          onChange={e => setName(e.target.value)}
        />

        <Input
          style={style}
          type='text'
          value={username}
          placeholder='Логин'
          onChange={e => setUsername(e.target.value)}
        />

        <Input
          style={style}
          type='password'
          value={password}
          placeholder='Пароль'
          onChange={e => setPassword(e.target.value)}
        />

        <Input
          style={style}
          type='password'
          value={confirmPassword}
          placeholder='Повторите пароль'
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <Input
          style={style}
          type='text'
          value={email}
          placeholder='E-mail'
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          style={style}
          type='text'
          value={phone}
          placeholder='Мобильный телефон'
          onChange={e => setPhone(e.target.value)}
        />

        <div className={cl.button}>
          <Button onClick={handleSubmit}>Регистрация</Button>
        </div>

      </div>
    </div>
  )
}

export default RegisterUser
import React, {useState} from 'react'
import cl from '../../../styles/registration/RegisterUser.module.css'
import { useAuth } from '../../../components/hook/useAuth'
import Input from '../../../components/ui/input/Input'
import Button from '../../../components/ui/button/Button'
import Hr from '../../../components/ui/hr/Hr'
import { useNavigate } from 'react-router-dom'

const RegisterUser = () => {

    const nav = useNavigate();
    const {store} = useAuth();
    const [isValid, setIsValid] = useState(true);
    const [apiErrorMessage, setApiErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [phoneError, setPhoneError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [nameError, setNameError] = useState('')

    const register = async (data) => {
        try {
            const response = await store.register(data);
            console.log(response);
            if(response.data == 'Okay') {
              await store.login(username,password);
              nav('/');
            }

            setApiErrorMessage(response)
        } catch (error) {
            console.log(error);
        }
    }

    const checkParams = () => {
      let state = true;

      if(name.length > 5 && name.length < 20)
        setNameError('')
      else {
        setNameError('Имя должно состоять из 5-20 символов')
        state = false;
      }

      if(password.length >= 8 && password.length <= 20 && confirmPassword == password )
        setPasswordError('')
      else {
        setPasswordError('Пароли должны быть одинаковы и состоять из 8-20 символов')
        state = false;
      }

      if(username.length >= 8 && username.length <= 20)
        setUsernameError('')
      else {
        setUsernameError('Логин должен состоять из 8-20 символов')
        state = false;
      }
      
      if(email.length > 5)
        setEmailError('')
      else {
        setEmailError('Почта не валидна')
        state = false;
      }
      
      if(phone.length == 11)
        setPhoneError('')
      else {
        setPhoneError('Номер на валиден')
        state = false;
      }

      return state;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(checkParams()){

          const data = new FormData();
          data.append('name', name);
          data.append('username', username);
          data.append('password', password);
          data.append('phone', phone);
          data.append('email', email);
          register(data);
        }
        else{
          setIsValid(false);
        }
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

        <div>{nameError}</div>
        <Input
          style={style}
          type='text'
          value={name}
          placeholder='Имя'
          onChange={e => setName(e.target.value)}
        />

        <div>{usernameError}</div>
        <Input
          style={style}
          type='text'
          value={username}
          placeholder='Логин'
          onChange={e => setUsername(e.target.value)}
        />

        <div>{passwordError}</div>
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

        <div>{emailError}</div>
        <Input
          style={style}
          type='text'
          value={email}
          placeholder='E-mail'
          onChange={e => setEmail(e.target.value)}
        />

        <div>{phoneError}</div>
        <Input
          style={style}
          type='number'
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
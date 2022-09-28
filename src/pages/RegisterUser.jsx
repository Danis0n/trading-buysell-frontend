import React, {useState, useEffect} from 'react'
import { useAuth } from '../components/hook/useAuth'
import AuthService from '../service/AuthService'
import { API_EMAIL_NOT_VALID, API_USERNAME_NOT_VALID } from '../components/http'

const RegisterUser = () => {

    const {store} = useAuth();
    const [isValid, setIsValid] = useState(true);
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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

  return (
    <div>
    <div>
        <label>
          Name
          <br />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='name'
          />
        </label>
      </div>
      <div>
        <label>
          Username
          <br />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='username'
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='password'
          />
        </label>
      </div>
      <div>
        <label>
          Email
          <br />
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='email'
          />
        </label>
      </div>
      <div>
        <label>
          Phone
          <br />
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder='phone'
          />
        </label>
      </div>

    <button onClick={handleSubmit}>submit</button>

    </div>
  )
}

export default RegisterUser
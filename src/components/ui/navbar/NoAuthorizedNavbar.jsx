import React from 'react'
import { useContext, useState } from 'react'
import { Context } from '../../..'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import LoginForm from '../login/LoginForm'
import { useAuth } from '../../hook/useAuth'
import CustomLink from '../link/CustomLink'

const NoAuthorizedNavbar = () => {

    const {store} = useAuth()
    const [loginModale, setLoginModale] = useState(false)

    const handleLogin = () => {
      setLoginModale(false);
    }

  return (
    <header className='navbar'>
        <div className='navbar__links__area'>
          <div className='navbar__catalog'>
            Лого
          </div>

          <div className='navbar__catalog'>
            <CustomLink to='/'>Главная</CustomLink>
          </div>

          <div className='navbar__catalog'>
            <CustomLink to='/about'>Контакты</CustomLink>
          </div>

          <div>
            <Button style={{marginTop: 0}} onClick={() => setLoginModale(true)}>
              Войти
            </Button>
            <Modal visible={loginModale} setVisible={setLoginModale}>
              <LoginForm handleLogin={handleLogin}/>
            </Modal>
          </div>
        </div>
    </header>
  )
}

export default NoAuthorizedNavbar
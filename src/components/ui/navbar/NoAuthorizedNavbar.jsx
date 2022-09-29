import React from 'react'
import { useContext, useState } from 'react'
import { Context } from '../../..'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import LoginForm from '../../LoginForm'
import { useAuth } from '../../hook/useAuth'

const NoAuthorizedNavbar = () => {

    const {store} = useAuth()
    const [loginModale, setLoginModale] = useState(false)

  return (
    <div className='navbar'>
        <div className='navbar__links__area'>

            <div className='navbar__catalog'>
              Лого
            </div>

            <div className='navbar__catalog'>
              Главная
            </div>

            <div className='navbar__catalog'>
              Контакты
            </div>

              <div>
                <Button style={{marginTop: 0}} onClick={() => setLoginModale(true)}>
                  Войти
                </Button>
                <Modal visible={loginModale} setVisible={setLoginModale}>
                  <LoginForm/>
                </Modal>
              </div>
        </div>
    </div>
  )
}

export default NoAuthorizedNavbar
import React, {useState, useContext} from 'react'
import { Context } from '../../..';
import LoginForm from '../login/LoginForm';
import Button from '../button/Button';
import Modal from '../modal/Modal';

// Каталог + поиск + авторизация

// будет проверять, залогинен ли юзверь

// сделать редирект на главную страницу после логина и выхода
const Navbar = ({auth}) => {

  const {store} = useContext(Context)
  const [loginModale, setLoginModale] = useState(false)
  const [catalog, setCatalog] = useState(false)

  return (
    <div className='navbar'>
        <div className='navbar__links__area'>
            <div className='navbar__catalog'>
              Каталог(кнопка)
            </div>

            <div className='navbar__search'>
              Поиск
            </div>

            {auth 
              ? 
              <div>
                <Button onClick={() => store.logout()}>
                  Выйти
                </Button>
              </div>
               :
              <div>
                <Button style={{marginTop: 0}} onClick={() => setLoginModale(true)}>
                  Войти
                </Button>
                <Modal visible={loginModale} setVisible={setLoginModale}>
                  <LoginForm/>
                </Modal>
              </div>
            }

            

        </div>
    </div>
  )
}

export default Navbar
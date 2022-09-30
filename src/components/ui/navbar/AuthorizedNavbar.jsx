import React from 'react'
import { useAuth } from '../../hook/useAuth'
import Button from '../button/Button'
import CustomLink from '../link/CustomLink'


const AuthorizedNavbar = () => {

  const {store} = useAuth()

  const submitLogout = (e) => {
    e.preventDefault();
    store.logout();
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
          <Button onClick={submitLogout}>
            Выйти
          </Button>
        </div>
      </div>
    </header>
  )
}

export default AuthorizedNavbar
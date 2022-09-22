import React from 'react'
import { AuthContext } from '..';
import { useAuth } from './hook/useAuth'

const Navbar = () => {

  const Style = {
      textAlign: 'center',   
  }

  const {store} = useAuth();

  return (
    <div
     style={Style}
    >
      <button
       onClick={() => store.logout()}
      >
        Выйти
      </button>
        {/* Каталог Поиск Выйти */}
    </div>
  )
}

export default Navbar
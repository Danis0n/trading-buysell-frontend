import React from 'react'
import { AuthContext } from '../hook/useAuth';
import { useEffect} from 'react';
import { useAuth } from '../hook/useAuth';

const AuthProvider = ({children }) => {

    const store = useAuth().store;

    useEffect(() => {
      if(localStorage.getItem('token')){
        store.checkAuth();
        console.log('check in provider')
      }
    }, []);

  return (
    <AuthContext.Provider value={{store}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
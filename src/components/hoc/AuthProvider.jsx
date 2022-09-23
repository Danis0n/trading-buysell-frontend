import React from 'react'
import { AuthContext } from '../hook/useAuth';
import { useEffect} from 'react';
import { useAuth } from '../hook/useAuth.ts';

const AuthProvider = ({children }) => {

    const {store} = useAuth();

    useEffect(() => {
      if(localStorage.getItem('token')){
        store.checkAuth();
      }
    }, []);
  
  return (
    <AuthContext.Provider value={{store}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
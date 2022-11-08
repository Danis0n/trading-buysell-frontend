import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/hook/useAuth';
import { toJS } from 'mobx';
import { isAdmin } from '../../utils/AdminUtil';
import Hr from '../../components/ui/hr/Hr';

const AdminPanel = () => {

  const nav = useNavigate();
  const {store} = useAuth();

  const [users, setUsers] = useState([]);

  const isUserAdmin = () => {
    return store.isAuth && isAdmin(toJS(store?.user?.roles));
  }

  const handleCheck = () => {
    if(!isUserAdmin()) nav('/'); 
  }

  useEffect(() =>{
    const timer = setTimeout(() => handleCheck(), 50);
    return () => clearTimeout(timer);
  })

  return (
    <div style={{
      minHeight: '600px',
      marginTop: '20px',
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>


      <div style={{fontSize: '30px'}}>
        Панель администрирования
      </div>
      <Hr/>

      <div>

      </div>

    </div>
  )
}

export default AdminPanel
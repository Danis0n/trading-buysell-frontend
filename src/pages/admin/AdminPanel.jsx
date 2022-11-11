import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/hook/useAuth';
import { toJS } from 'mobx';
import { isAdmin } from '../../utils/AdminUtil';
import Hr from '../../components/ui/hr/Hr';
import UserService from '../../service/UserService';
import AdminPanelUsers from './users/AdminPanelUsers';
import Types from './types/Types';

const AdminPanel = () => {

  const nav = useNavigate();
  const {store} = useAuth();

  const [isUsers, setIsUsers] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const isUserAdmin = () => {
    return store.isAuth && isAdmin(toJS(store?.user?.roles));
  }

  const handleCheck = () => {
    if(!isUserAdmin()) 
      nav('/'); 
    else
      fetchUsers();
  }

  const handlePage = (e, bool) => {
    e.preventDefault();
    setIsUsers(bool);
  }

  useEffect(() =>{
    const timer = setTimeout(() => handleCheck(), 50);
    return () => clearTimeout(timer);
  })

  const linkStyle = {
    boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
    padding: '10px 300px',
    borderRadius: "10px"
  }

  const style = {
    marginLeft: 'auto', marginRight: 'auto',
  }

  return (
    <div style={{
      minHeight: '600px',
      marginTop: '20px',
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>

      <div style={{fontSize: '30px', marginBottom: '50px'}}>
        Панель администрирования
        <Hr/>
      </div>

      <div style={{
        display: 'flex', gap: '1rem',
        marginLeft: 'auto', marginRight: 'auto'
      }}>
        <div style={style}><a style={linkStyle} onClick={(e) => handlePage(e,true)} href='!#'>Пользователи</a></div>
        <div style={style}><a style={linkStyle} onClick={(e) => handlePage(e,false)} href='!#'>Типы</a></div>
      </div>

      {isUsers ?
      <div>
        <AdminPanelUsers users={users} meId={store?.user?.id}/>
      </div>
      :
      <Types/>
      }


    </div>
  )
}

export default AdminPanel
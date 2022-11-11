import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import AdvertService from '../../../service/AdvertService';
import AdvertAdminElement from './AdvertAdminElement';
import { useAuth } from '../../../components/hook/useAuth';
import { isAdmin } from '../../../utils/AdminUtil';
import { toJS } from 'mobx';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserAdvetsAdmin = () => {

  const nav = useNavigate();
  const {store} = useAuth();
  const [id,setId] = useSearchParams();
  const [userId, setUserId] = useState(id.get('user'));
  const [adverts, setAdverts] = useState([])

  const fetchAdverts = async (id) => {
    try {
      const response = await AdvertService.getAllByUserId(id);
      setAdverts(response.data);
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
  }
  
  useEffect(() =>{
    const timer = setTimeout(() => handleCheck(), 50);
    fetchAdverts(userId)
    return () => clearTimeout(timer);
  })

  // useEffect(() => {
  // }, [])
  
  return (
    <div style={{
      minHeight: '600px',
      marginTop: '20px',
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      {adverts.length > 0 ?
      <div>
        {adverts.map(element => {
          return <AdvertAdminElement key={element.id} advert={element}/>
        })}
      </div> 
      :
      <div style={{
        fontSize: '30px',
        marginTop: '100px'
      }}>
        У данного пользователя отсутствуют объявления
      </div>
      }

    </div>
  )
}

export default UserAdvetsAdmin
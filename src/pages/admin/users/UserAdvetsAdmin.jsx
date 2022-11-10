import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import AdvertService from '../../../service/AdvertService';
import AdvertAdminElement from './AdvertAdminElement';

const UserAdvetsAdmin = () => {

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

  useEffect(() => {
    fetchAdverts(userId)
  }, [])
  
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
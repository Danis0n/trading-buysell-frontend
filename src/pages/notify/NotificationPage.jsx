import React, {useEffect, useState} from 'react'
import Hr from '../../components/ui/hr/Hr'
import { useAuth } from '../../components/hook/useAuth'
import { useNavigate } from 'react-router-dom'
import NotifyService from '../../service/NotifyService'
import NotificationElement from './NotificationElement'

const NotificationPage = () => {

    const {store} = useAuth();
    const nav = useNavigate();

    const [notifications, setNotifications] = useState([])

    const fetchNotifications = async (id) => {
        try {
            const response = await NotifyService.getAllByUserId(id);
            setNotifications(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheck = () => {
        if(!store.isAuth) nav('/'); 
        fetchNotifications(store.user.id);
    }
    
    useEffect(() =>{
        const timer = setTimeout(() => handleCheck(), 30);
        return () => clearTimeout(timer);
    },[])
    
    return (
        <div style={{
            minHeight: '600px',
            marginTop: '20px',
            display: 'table',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <div style={{fontSize: '40px'}}>
                Уведомления
            </div>
            <Hr/>

            <div>
                {notifications.length > 0 ?
                    notifications.map((element) => {
                        return <NotificationElement key={element.id} element={element}/>
                    })
                :
                    <div style={{
                        marginTop: '100px',
                        fontSize: '40px',
                    }}>Упс... Тут ничего нет.</div>
                }
            </div>
        </div>
    )
}

export default NotificationPage
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
        console.log(id);
    }

    const handleCheck = () => {
        if(!store.isAuth) nav('/'); 
        fetchNotifications(store.user.id);
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
                Уведомления
            </div>
            <Hr/>

            <div>

            </div>
        </div>
    )
}

export default NotificationPage
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../components/hook/useAuth';
import UserService from '../../service/UserService';
import Comments from '../comment/Comments';
import CreateComment from '../comment/CreateComment';

const UserPage = () => {

    const {id} = useParams();
    const {store} = useAuth();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false)

    const fetchUser = async (id) => {
        setLoading(true)
        try {
            const response = await UserService.fetchUser(id)
            setUser(response.data);
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

    useEffect( () => {
        fetchUser(id);
    }, [])

    if(loading){
        return <div>loading</div>
    }

    return (
        <div style={{
            display: 'table',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <div>{user?.id}</div>
            <div>{user?.info?.name}</div>
            <div>{user?.username}</div>
            <br/>
            <CreateComment id={id} myId={store.user.id}/>
            <br/>
            <Comments id={id} userId={store.user.id} />
        </div>
    )
}

export default UserPage
import React, {useState, useEffect} from 'react'
import AdvertService from '../../service/AdvertService'
import { useParams } from 'react-router-dom'
import Gallery from '../../components/Gallery'
import NoAvatar from '../../images/no-avatar.png'
import CustomLink from '../../components/ui/link/CustomLink'
import cl from '../../styles/advert/AdvertPage.module.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../components/hook/useAuth'
import UserService from '../../service/UserService'
import Image from '../../components/ui/img/Image'

const AdvertPage = () => {

    const {store} = useAuth();
    const [user,setUser] = useState();
    const [advert, setAdvert] = useState();
    const {id} = useParams();

    async function handleDelete() {
        try {
            const response = await AdvertService.delete(id);
            console.log(response);
        } catch (error) {
            console.log(error);            
        }
    }

    async function fetchData() {
        try {
            const response = await AdvertService.getId(id);
            setAdvert(response.data);
            if(response?.data?.userId){
                fetchUser(response?.data?.userId);
            }
        } catch (error) {
            console.log(error.message);            
        }
    }

    async function fetchUser(id) {
        try {
            const userResponse = await UserService.fetchUser(id);
            setUser(userResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>  {
        fetchData();
    }, [])

    return (
        <div className={cl.advertWrapper}>
            <div className={cl.itemMainInfo}>
                <div>{advert?.description}</div>
                <div>{advert?.location}</div>
                <div>{advert?.type.name}</div>
                <div>{advert?.location}</div>
                <Gallery
                galleryImages={advert?.images}
                />

                {advert?.userId == store.user.id ?
                <div>
                    <Link to='edit'>Edit</Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                :
                <></>}

            </div>

            <div className={cl.itemRightInfo}>
                <div className={cl.itemAdvertInfo}>
                    <div className={cl.itemTitle}>{advert?.title}</div>
                    <div className={cl.itemDate}>{advert?.dateOfCreation.substring(0,10)}</div>
                    <div className={cl.itemPrice}>{advert?.price} рублей</div>
                </div>
                <div className={cl.itemUserInfo}>
                    <Image width='100' height='100' src={NoAvatar} alt="no-avatar" />
                    <div className={cl.itemName}>{user?.info?.name}</div>
                    <div className={cl.itemNumbers}>{user?.info?.phone}</div>
                    <div className={cl.itemNumbers}>Рейтинг: {user?.info.rating}</div>
                    <CustomLink to={`/user/${advert?.userId}`}>
                        Профиль
                    </CustomLink>
                </div>
            </div>
        </div>
    )
}

export default AdvertPage;
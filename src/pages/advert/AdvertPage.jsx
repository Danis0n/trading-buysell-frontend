import React, {useState, useEffect} from 'react'
import AdvertService from '../../service/AdvertService'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../components/hook/useAuth'
import UserService from '../../service/UserService'
import Gallery from '../../components/Gallery'
import Button from '../../components/ui/button/Button'
import NoAvatar from '../../images/no-avatar.png'
import CellPhone from '../../images/icons/phone.svg'
import CustomLink from '../../components/ui/link/CustomLink'
import cl from '../../styles/advert/AdvertPage.module.css'
import Image from '../../components/ui/img/Image'
import Paragraph from '../../components/ui/paragraph/Paragraph'
import Hr from '../../components/ui/hr/Hr'
import map from '../../utils/ImageUtil'
import Dot from '../../components/ui/dot/Dot'
import ImageSlider from '../../components/ui/slider/Slider'

const AdvertPage = () => {

    const {store} = useAuth();
    const [user,setUser] = useState();
    const [advert, setAdvert] = useState();
    const {id} = useParams();

    // TODO : on backend side implement 404 NOT FOUND after deleting advert
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

    const containerStyles = {
        width: "700px",
        height: "480px",
        margin: "0 auto",
      };

    return (
        <div className={cl.advertWrapper}>
            <div className={cl.itemMainInfo}>

                <div className={cl.itemGallery}>
                    {advert?.images
                    ?
                    <ImageSlider images={advert?.images} />
                    :
                    <></>
                    }
                </div>

                <div>
                    <div className={cl.itemTitle}>Описание</div>
                    <Hr/>
                    <Paragraph>
                        {/* TODO : implement text , not varchar on backend */}
                        {/* {advert?.description} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quisquam quo, ea optio porro natus, 
                        reprehenderit incidunt temporibus quod eos magnam, harum repellendus? Non, sapiente culpa. Quibusdam obcaecati modi,
                        nisi, a voluptas eius eveniet quia delectus odit laudantium aliquam corrupti mollitia impedit repellat deserunt, culpa minus asperiores!
                        Impedit ipsum, eum vel mollitia, ut voluptas maxime ad explicabo accusamus perspiciatis facere eius iusto rem sequi. 
                        Eius corporis sunt id ratione doloribus!
                    </Paragraph>

                    <div className={cl.itemTitle}>Местоположение</div>
                    <Hr/>
                    <Paragraph>
                        <div>{advert?.location}</div>
                    </Paragraph>
                </div>
            </div>

            <div className={cl.itemRightInfo}>
                <div className={cl.itemAdvertInfo}>
                    <div className={cl.itemType}>
                        <CustomLink to={`/adverts/type/${advert?.type?.name}`}>
                            <Dot>
                                <Image src={map.get(advert?.type?.name)} alt='typeLogo'/>
                            </Dot>
                        </CustomLink>
                    </div>
                    <div className={cl.itemTitle}>{advert?.title}</div>
                    <div className={cl.itemDate}>{advert?.dateOfCreation.substring(0,10)}</div>
                    <div className={cl.itemPrice}>{advert?.price} рублей</div>
                </div>
                <div className={cl.itemUserInfo}>
                    <Image width='100' height='100' src={NoAvatar} alt="no-avatar" />
                    <div className={cl.itemName}>{user?.info?.name}</div>
                    <div className={cl.itemNumbers}>
                        <Image src={CellPhone} alt='cell-phone' width='30' height='30'/>
                        {user?.info?.phone}
                    </div>
                    <div className={cl.itemNumbers}>Рейтинг: {user?.info.rating}</div>
                    <CustomLink to={`/user/${advert?.userId}`}>
                        Профиль
                    </CustomLink>
                </div>

                {advert?.userId === store.user.id
                ?
                <div className={cl.itemControl}>
                    <CustomLink to='edit'>Edit</CustomLink>
                    <Button onClick={handleDelete}>Delete</Button>
                </div>
                :
                <></>}

            </div>
        </div>
    )
}

export default AdvertPage;
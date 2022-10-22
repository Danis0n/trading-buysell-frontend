import React, {useState, useEffect} from 'react'
import AdvertService from '../../service/AdvertService'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../components/hook/useAuth'
import UserService from '../../service/UserService'
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
import SearchedAdverts from './SearchedAdverts'
import Confirm from '../../components/ui/confirm/Confirm'
import Modal from '../../components/ui/modal/Modal'

const AdvertPage = () => {


    const [similar, setSimilar] = useState([])
    const {store} = useAuth();
    const [user,setUser] = useState();
    const [advert, setAdvert] = useState();
    const {id} = useParams();

    const [confirmModal, setConfirmModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [advertsPerPage] = useState(3);

    const indexOfLastAdvert = currentPage * advertsPerPage;
    const indexOfFirstAdvert = indexOfLastAdvert - advertsPerPage;
    const currentAdverts = similar.slice(indexOfFirstAdvert, indexOfLastAdvert);
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        return pageNumber;
    }

    async function handleDelete() {
        setConfirmModal(false);
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
            if(response?.data){
                fetchSecondData(response?.data);
            }
        } catch (error) {
            console.log(error.message);            
        }
    }

    async function fetchSecondData(advert) {
        fetchUser(advert?.userId);
        fetchSimilar(advert?.type?.name);
    }

    async function fetchUser(id) {
        try {
            const userResponse = await UserService.fetchUser(id);
            setUser(userResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSimilar = async (type) => {
        try {
            const response = await AdvertService.getType(type);
            setSimilar(response.data);
        } catch (error) {
            console.log(error);
        } finally{
        }
    }

    useEffect(() =>  {
        fetchData();
    }, [])

    return (
        <div style={{
            display: 'table',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
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
                      {advert?.description}
                    </Paragraph>

                    <div className={cl.itemTitle}>Адрес</div>
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
                    <div style={{display: 'inline-block'}}>
                      <CustomLink to='edit'>Изменить</CustomLink>
                    </div>
                    
                    <div style={{display: 'inline-block'}}>
                      <Button onClick={() => setConfirmModal(true)}>Удалить</Button>
                    </div>

                    <Modal
                      visible={confirmModal}
                      setVisible={setConfirmModal}
                    >
                      <Confirm
                        handleCancel={() => setConfirmModal(false)}
                        handleItem={handleDelete}
                        message='Вы точно хотите удалить объявление?'/>
                    </Modal>
                </div>
                :
                <></>}

            </div>
        </div>

        <div>
            <div style={{
                marginBottom: '40px',
            }}>
                <div style={{
                    fontSize: '36px',
                }}>Похожие объявления</div>
                <Hr/>
                <div style={{
                    color: '#959494',
                }}>Посмотрите некоторые из лучших предложений</div>
            </div>

            <SearchedAdverts
             currentAdverts={currentAdverts}
             advertsPerPage={advertsPerPage}
             adverts={similar}
             paginate={paginate}
                 style={{
                     margin: 'auto',
                     maxWidth: '1000px',
                 }}
                 isPagable
            />
        </div>
        </div>
    )
}

export default AdvertPage;
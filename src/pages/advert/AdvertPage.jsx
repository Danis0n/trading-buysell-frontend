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
import SearchedAdverts from './search/SearchedAdverts'
import Confirm from '../../components/ui/confirm/Confirm'
import Modal from '../../components/ui/modal/Modal'
import { useNavigate } from 'react-router-dom'
import { isAdmin } from '../../utils/AdminUtil'
import { toJS } from 'mobx'
import AdminService from '../../service/AdminService'
import NotifyUser from '../admin/users/NotifyUser'

const AdvertPage = () => {

    const nav = useNavigate();
    const [similar, setSimilar] = useState([])
    const {store} = useAuth();
    const [user,setUser] = useState();
    const [advert, setAdvert] = useState();
    const {id} = useParams();
    
    const isUserAdmin = () => {
        return store.isAuth && isAdmin(toJS(store?.user?.roles));
    }

    const [admin, setAdmin] = useState(isUserAdmin());
    const [modalAdmin, setModalAdmin] = useState(false);
    const [modalHideAdmin, setModalHideAdmin] = useState(false);
    const [message, setMessage] = useState('');

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
            if(response.data === '') {
                nav('/');
            }
            setAdvert(response.data);
            if(response?.data){
                fetchSecondData(response?.data);
            }
        } catch (error) {
            console.log(error);  
            if(error.request.status === 400) {
                nav('/');
            }               
        }
    }

    async function fetchSecondData(advert) {
        getUser(advert?.userId);
        getSimilar(getJson(advert));
    }

    async function getUser(id) {
        try {
            const userResponse = await UserService.fetchUser(id);
            setUser(userResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getSimilar = async (data) => {
        try {
            const response = await AdvertService.getByParams(data);
            setSimilar(response.data);
        } catch (error) {
            console.log(error);
        } finally{
        }
    }

    const getJson = (advert) => {
        return JSON.stringify({
            title: '',
            type: {
                titleType : advert?.type?.titleType?.name,
                mainType : [advert?.type?.mainType?.name],
                subType : [],
                brandType : [],
                locations : [advert?.location?.name]
            },
            minPrice: '50',
            maxPrice: '10000000'
        })
    }

    const getMessageJson = () => {
        return JSON.stringify({
            message: message
        })
    }

    const powerDelete = async (id, message) => {
        try {
            const response = await AdminService.powerDeleteById(id, message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelAdmin = () => {
        setModalAdmin(false);
        setModalHideAdmin(false);
        setMessage('')
    }

    const handleSubmitDeleteAdmin = (id, message, action) => {
        setModalAdmin(false);
        window.location.reload();
        action(id, getMessageJson(message));
    }

    const handleSubmitHideAdmin = (id, userId, message, action) => {
        setModalHideAdmin(false);
        window.location.reload();
        action(id, userId, getMessageJson(message));
    }
    
    const powerHideById = async (id, userId, message) => {
        console.log(message);
        try {
            const response = await AdminService.powerHideById(id, userId, message);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const powerUnHideById = async (id, userId ,message) => {
        try {
            const response = await AdminService.powerUnHideById(id, userId, message);
            console.log(response.data);
        } catch (error) {
            console.log(error);
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
                </div>
            </div>

            <div className={cl.itemRightInfo}>
                <div className={cl.itemAdvertInfo}>
                    <div className={cl.itemType}>
                        <Dot>
                            <Image src={map.get(advert?.type?.titleType?.name)} alt='typeLogo'/>
                        </Dot>
                    </div>
                    <div className={cl.itemTitle}>{advert?.title}</div>
                    <div className={cl.itemDate}>{advert?.dateOfCreation.substring(0,10)}</div>
                    <div className={cl.itemPrice}>{advert?.price} рублей</div>
                    <Hr/>
                    <div>{advert?.location.description}</div>
                </div>
                {admin?
                <div className={cl.itemAdvertInfo}>
                    <div>
                        <div style={{
                            marginBottom: '20px',
                        }}>
                            <Button
                             style={{color: 'black', backgroundColor: 'white'}}
                             onClick={
                                () => setModalHideAdmin(true)}
                            >
                            {advert?.isHiddenByAdmin ?
                            <div>Разграничить доступ</div>
                            :
                            <div>Ограничить доступ</div>
                            }  
                            </Button>

                            <Modal
                                visible={modalHideAdmin}
                                setVisible={setModalHideAdmin}
                            >
                            <NotifyUser
                             handleCancel={() => handleCancelAdmin()}
                             handleSubmit={() => handleSubmitHideAdmin(id, advert?.userId,
                                getMessageJson(), advert?.isHiddenByAdmin ? powerUnHideById : powerHideById)
                             }
                             text={'Админ панель: Укажите причину действия'}
                             message={message}
                             setMessage={setMessage}
                            />
                            </Modal>

                        </div>
                        <div>
                            <Button onClick={() => setModalAdmin(true)}>
                            Удалить
                            </Button>

                            <Modal
                                visible={modalAdmin}
                                setVisible={setModalAdmin}
                            >
                            <NotifyUser
                             handleCancel={() => handleCancelAdmin()}
                             handleSubmit={() => handleSubmitDeleteAdmin(id, getMessageJson(),powerDelete)}
                             text={'Админ панель: Укажите причину удаления'}
                             message={message}
                             setMessage={setMessage}
                            />
                            </Modal>
                        </div>
                    </div>
                </div>
                :
                <></>
                }
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
                <div style={{
                    width: '90%',
                    margin: '0 auto',
                    textAlign : 'center',
                    display : 'flex',
                    justifyContent : 'space-between',
                }}>
                    <div style={{marginTop: '5px'}}>
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
                        message='Вы точно хотите удалить объявление?'
                        link={'/'}
                      />
                    </Modal>
                </div>
                :
                <></>}
            </div>
        </div>

        <div>
            {similar.length <= 1 
            ?
            <></>
            :
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
                    isPageable
                    refusedAdvert={advert}
                />
            </div>
            }
        </div>


        </div>
    )
}

export default AdvertPage;
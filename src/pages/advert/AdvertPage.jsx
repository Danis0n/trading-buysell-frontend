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
import { useNavigate } from 'react-router-dom'

const AdvertPage = () => {

    const nav = useNavigate();
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

    const deleteAdvert = async () => {
        handleDelete();
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
        fetchUser(advert?.userId);
        // fetchSimilar(advert?.type?.name);
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
                        handleItem={deleteAdvert}
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
            />
        </div>
        </div>
    )
}

export default AdvertPage;
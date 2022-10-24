import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../components/hook/useAuth';
import UserService from '../../service/UserService';
import Comments from '../comment/Comments';
import CreateComment from '../comment/CreateComment';
import AdvertService from '../../service/AdvertService';
import NoAvatar from '../../images/no-avatar.png'
import Phone from '../../images/icons/phone.svg'
import Calendar from '../../images/icons/calendar.svg'
import Image from '../../components/ui/img/Image';
import SearchedAdverts from '../advert/SearchedAdverts';
import Hr from '../../components/ui/hr/Hr';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {

    const nav = useNavigate();
    const {id} = useParams();
    const {store} = useAuth();
    const [user, setUser] = useState();
    const [adverts, setAdverts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [advertsPerPage] = useState(3);

    const indexOfLastAdvert = currentPage * advertsPerPage;
    const indexOfFirstAdvert = indexOfLastAdvert - advertsPerPage;
    const currentAdverts = adverts.slice(indexOfFirstAdvert, indexOfLastAdvert);
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        return pageNumber;
    }
    const fetchData = async (id) => {
        setLoading(true)
        try {
            const response = await UserService.fetchUser(id);
            if(response.data === '') {
                nav('/');
            }
            setUser(response.data);
            if(response.data){
                fetchAdverts(response.data.id);
            }
        } catch (error) {
            console.log(error);
            if(error.request.status === 400) {
                nav('/');
            }
            
        } finally{
            setLoading(false);
        }
    }

    const fetchAdverts = async (id) => {
        setLoading(true);
        try {
            const response = await AdvertService.getAllByUserId(id);
            setAdverts(response.data);
        } catch (error) {
            console.log(error.message);            
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData(id);
    }, [])

    if(loading){
        return <div>loading</div>
    }
    return (
        <div style={{
            height: '800px',
            marginTop: '20px',
            display: 'table',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <div>
                <div style={{
                    marginBottom: '100px',
                }}>
                    <div style={{
                        display: 'table',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: '50px',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            verticalAlign: 'top',
                        }}>
                            <Image src={NoAvatar} width='130px' alt={'profile_pic'}/>
                        </div>

                        <div
                            style={{
                            textAlign: 'start',
                            marginLeft: '40px',
                            }}
                        >
                            <div style={{
                                margin: '10px 10px',
                                display: 'flex',
                            }}>
                                <div style={{fontSize: "24px", marginRight: '30px'}}>
                                    {user?.info.name}
                                </div>
                                 <div style={{fontSize: '24px'}}>
                                   Рейтинг: {user?.info?.rating}
                                </div>
                            </div>

                            <div style={{display: 'flex'}}>
                                <div style={{
                                    fontSize: '20px',
                                    color: '#7c7c7c',
                                    verticalAlign: 'middle',
                                    margin: '0 25px 10px 0',
                                }}>
                                    <Image style={{
                                        margin: '4px 7px -4px 0',
                                    }}
                                    src={Phone} 
                                    alt='phone' 
                                    width='18px'
                                    />
                                    {user?.info.phone}
                                </div>
                                <div
                                    style={{
                                    color: '#7c7c7c',
                                    display: 'flex',
                                    }}
                                >   
                                    <Image
                                        style={{
                                        marginRight: '10px',
                                        marginTop: '-10px',
                                        }} 
                                        src={Calendar} 
                                        width='18px' 
                                        alt={'calendar'}
                                    />
                                    <div style={{
                                        marginRight: '10px',
                                    }}>
                                        Дата регистрации : 
                                    </div>
                                    <div>
                                        {user?.info.dateOfCreation.substring(0,10)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div style={{
                        fontSize: '30px',
                    }}>
                        Последние объявления
                        <Hr/>
                    </div>

                    <SearchedAdverts
                        currentAdverts={currentAdverts}
                        advertsPerPage={advertsPerPage}
                        adverts={adverts}
                        paginate={paginate}
                        style={{
                            margin: 'auto',
                            maxWidth: '1000px',
                        }}
                        isPageable
                    />
                </div>

                <div>

                    <div style={{
                        fontSize: '30px',
                    }}>
                        Комментарии
                        <Hr/>
                    </div>

                    <div>
                        <CreateComment id={id} myId={store?.user?.id}/>
                    </div>
                    <div>
                        <Comments id={id} userId={store?.user?.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
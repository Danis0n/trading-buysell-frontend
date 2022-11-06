import React, {useState, useEffect} from 'react'
import Hr from '../../components/ui/hr/Hr'
import { pageTitleText, wrapper } from '../../utils/StyleUtil'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../components/hook/useAuth'
import AdvertService from '../../service/AdvertService'
import SearchedAdverts from '../advert/SearchedAdverts'

const UserAdverts = () => {

    const nav = useNavigate();
    const {id} = useParams();
    const {store} = useAuth();
    const [myId, setMyId] = useState(store.user.id)
    const [isAuth, setIsAuth] = useState(store.isAuth)
    const [adverts, setAdverts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [advertsPerPage] = useState(12);

    const indexOfLastAdvert = currentPage * advertsPerPage;
    const indexOfFirstAdvert = indexOfLastAdvert - advertsPerPage;
    const currentAdverts = adverts.slice(indexOfFirstAdvert, indexOfLastAdvert);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        return pageNumber;
    }

    const fetchAdverts = async (id) => {
        try {
            const response = await AdvertService.getAllByUserId(id);
            setAdverts(response.data);
        } catch (error) {
            console.log(error.message);            
        } finally{

        }
    }

    const handleCheck = async () => {      
        if(isAuth && id == myId) {    
        } else {
          nav('/');
        }
      }

    useEffect(() => {
        const timer = setTimeout(() => handleCheck(), 500);
        fetchAdverts(id)
        return () => clearTimeout(timer);

    }, [])

  return (
    <div style={wrapper}>

        <div style={pageTitleText}>
            Ваши объявления
            </div>
        <Hr/>

        <div>
            {loading
            ?
            <div>
                {/* Spinner */}
            </div>
            :
            <div>
                {adverts.length >= 1
                ?
                <SearchedAdverts
                    currentAdverts={currentAdverts}
                    advertsPerPage={advertsPerPage}
                    adverts={adverts}
                    paginate={paginate}
                    style={{
                        marginLeft: 'auto',
                        width: '1500px'
                    }}
                    isPageable
                    isAdmin
                />              
                :
                <div style={pageTitleText}>
                    Пусто
                </div>
                }
            </div>    
        }
        </div>

    </div>
  )
}

export default UserAdverts
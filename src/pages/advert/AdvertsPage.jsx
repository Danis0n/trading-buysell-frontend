import React, {useState, useEffect, useRef} from 'react'
import AdvertService from '../../service/AdvertService';
import AdvertElement from './AdvertElement';
import cl from '../../styles/advert/AdvertsPage.module.css'
import Hr from '../../components/ui/hr/Hr';
import Input from '../../components/ui/input/Input';
import Select from '../../components/ui/select/Select';
import PrecisionSelect from '../../components/ui/select/PrecisionSelect';
import Button from '../../components/ui/button/Button';
import Pagination from '../../components/ui/pagination/Pagination';
import SearchedAdverts from './SearchedAdverts';


const AdvertsPage = () => {

    const [adverts, setAdverts] = useState([])
    const [searchedAdverts, setSearchedAdverts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [currentPage, setCurrentPage] = useState(1);
    const [advertsPerPage] = useState(10);
    
    const fetchData = async () => {
        try {
            const response = await AdvertService.getAll();
            setAdverts(response.data);
            setSearchedAdverts(response.data);
        } catch (error) {
            console.log(error.message);            
        }   
    }

    useEffect(() =>  {
        fetchData();
    }, [])

    const indexOfLastAdvert = currentPage * advertsPerPage;
    const indexOfFirstAdvert = indexOfLastAdvert - advertsPerPage;
    const currentAdverts = searchedAdverts.slice(indexOfFirstAdvert, indexOfLastAdvert);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const style = {
        width : '200px',
        fontSize : '17px'
    }

    return (
        <div>
            <div className={cl.titleWord}>
                Объявления
                <Hr/>
            </div>

            <div className={cl.advertWrapper}>
                <div className={cl.searchArea}>
                    <div className={cl.titleSector}>
                        Введите запрос
                    </div>
                    <Input
                        style={style}
                        type="text"
                        placeholder='напр. работа'
                    />

                    <div className={cl.titleSector}>
                        Категория
                    </div>
                    <div className={cl.itemField}>
                    {/* TODO : implement it to useState value */}
                        <Select style={style}>
                            <option disabled defaultValue value='none'>Выберете категорию</option>
                            <option value='job'>Работа</option>
                            <option value='auto'>Авто</option>
                            <option value='animal'>Животные</option>
                        </Select>
                    </div>

                    <div className={cl.titleSector}>
                        Город
                    </div>
                    <Input
                        style={style}
                        type="text"
                        placeholder='напр. Брянск'
                    />

                    <div className={cl.titleSector}>
                        Цена
                    </div>
                    <Input
                        style={style}
                        type='range'
                        min='100'
                        max='1000000'
                    />
                    <div className={cl.searchButton}>
                        <Button>Поиск</Button>
                    </div>
                </div>

                <div className={cl.rightArea}>

                    <div className={cl.precisionSearchArea}>
                        {/* TODO : implement some sort here */}
                        <div className={cl.item}>
                        {/* TODO : implement it with useState value */}
                        <PrecisionSelect>
                            <option value='new'>Новые объявления</option>
                            <option value='more'>Более низкая цена первая</option>
                            <option value='less'>Более высокая цена первая</option>
                        </PrecisionSelect>
                        </div>
                    </div>

                    <SearchedAdverts
                        currentAdverts={currentAdverts}
                        advertsPerPage={advertsPerPage}
                        adverts={adverts}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdvertsPage
import React, {useState, useEffect} from 'react'
import AdvertService from '../../service/AdvertService';
import cl from '../../styles/advert/AdvertsPage.module.css'
import Hr from '../../components/ui/hr/Hr';
import Input from '../../components/ui/input/Input';
import Select from '../../components/ui/select/Select';
import PrecisionSelect from '../../components/ui/select/PrecisionSelect';
import Button from '../../components/ui/button/Button';
import SearchedAdverts from './SearchedAdverts';


const AdvertsPage = () => {

    const minValue = 50;
    const maxValue = 10000000;

    const [adverts, setAdverts] = useState([])
    const [title, setTitle] = useState('none');
    const [location, setLocation] = useState('none');
    const [minPrice, setMinPrice] = useState(minValue);
    const [maxPrice, setMaxPrice] = useState(maxValue);
    const [type, setType] = useState('none');

    const [searchedAdverts, setSearchedAdverts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [advertsPerPage] = useState(9);
    
    const fetchDataByParams = async (title, type, location, minPrice, maxPrice) => {
        try {
            const response = await AdvertService.getParams(
                title,type,location,
                minPrice,maxPrice);
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            const response = await AdvertService.getAll();
            setAdverts(response.data);
            setSearchedAdverts(response.data);
        } catch (error) {
            console.log(error.message);            
        }   
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchDataByParams(title,type, location, minPrice, maxPrice);
    }

    useEffect(() =>  {
        fetchData();
    }, [])
    
    const indexOfLastAdvert = currentPage * advertsPerPage;
    const indexOfFirstAdvert = indexOfLastAdvert - advertsPerPage;
    const currentAdverts = searchedAdverts.slice(indexOfFirstAdvert, indexOfLastAdvert);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const style = {
        width : '200px',
        fontSize : '17px'
    }

    const paramsInputStyle = {
        width : '90px',
        fontSize : '17px',
        marginRight : '20px',
    }

    const buttonDefaults = {
        backgroundColor : '#F9F8F8',
        color : 'black',
    }

    const button = {
        textAlign :'center',
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
                        onChange={e => setTitle(e.target.value)}
                    />

                    <div className={cl.titleSector}>
                        Категория
                    </div>
                    <div className={cl.itemField}>
                        <Select style={style} value={type} onChange={(e) => setType(e.target.value)}>
                            <option disabled defaultValue value='none'>Категория</option>
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
                        onChange={e => setLocation(e.target.value)}
                    />

                    <div className={cl.titleSector}>
                        Цена
                    </div>
                    <div className={cl.paramsInputPrice}>
                        <Input
                            style={paramsInputStyle}
                            type='text'
                            placeholder='Мин'
                            onChange={e => setMinPrice(e.target.value)}
                        />
                        <Input
                            style={paramsInputStyle}
                            type='text'
                            placeholder='Макс'
                            onChange={e => setMaxPrice(e.target.value)}
                        />
                    </div>

                    <div className={cl.buttonArea}>
                        <div className={cl.searchButton}>
                            <Button style={button} onClick={handleSubmit}>Поиск</Button>
                        </div>
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
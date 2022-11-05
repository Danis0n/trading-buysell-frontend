import React, {useState, useEffect} from 'react'
import AdvertService from '../../service/AdvertService';
import cl from '../../styles/advert/AdvertsPage.module.css'
import Hr from '../../components/ui/hr/Hr';
import SearchedAdverts from './SearchedAdverts';
import Coffe from '../../images/icons/coffe.jpg';
import Dropdown from 'react-bootstrap/esm/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchElement from './SearchElement';
import Input from '../../components/ui/input/Input';
import Button from '../../components/ui/button/Button';

const AdvertsPage = () => {

    const minValue = 50;
    const maxValue = 10000000;

    const [adverts, setAdverts] = useState([])
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState([]);
    const [minPrice, setMinPrice] = useState(minValue);
    const [maxPrice, setMaxPrice] = useState(maxValue);
    
    const [titleType, setTitleType] = useState('');
    const [mainType, setMainType] = useState([])
    const [subType, setSubType] = useState([])
    const [brandType, setBrandType] = useState([])

    const [brandAvailables, setBrandAvailables] = useState([])
    const [subAvailables, setSubAvailables] = useState([])
    const [mainAvailables, setMainAvailables] = useState([])
    const [locationAvailables, setLocationAvailables] = useState([])

    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [advertsPerPage] = useState(9);
    
    const toggleBrand = value => {
        if(brandType.includes(value)) setBrandType(brandType.filter((e) => e !== value));
        else setBrandType(val => val.concat(value))
    }

    const toggleMain = value => {
        if(mainType.includes(value)) setMainType(mainType.filter((e) => e !== value));
        else setMainType(val => val.concat(value))
    }

    const toggleSub = value => {
        if(subType.includes(value)) setSubType(subType.filter((e) => e !== value));
        else setSubType(val => val.concat(value))
    }

    const toggleLocation = value => {
        if(location.includes(value)) setLocation(location.filter((e) => e !== value));
        else setLocation(val => val.concat(value))
    }

    const fetchAvailableBrand = async (data) => {
        try {
          const response = await AdvertService.getAvailables(data);
          setBrandAvailables(response.data)
        } catch (error) {
          console.log(error);
        }
    }

    const fetchAvailableSub = async (data) => {
        try {
          const response = await AdvertService.getAvailablesSub(data);
          setSubAvailables(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAvailableMain = async (data) => {
        try {
          const response = await AdvertService.getAvailablesMain(data);
          setMainAvailables(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAvailableLocation = async (data) => {
        console.log(data);
        try {
          const response = await AdvertService.getAvailablesLocation(data);
          setLocationAvailables(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDataByParams = async (data) => {
        try {
            const response = await AdvertService.getParams(data);
            setAdverts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getJson = (title) => {
        return JSON.stringify({
            title: title,
            type: {
                titleType: titleType,
                mainType: mainType,
                subType: subType,
                brandType: brandType,
                locations: location
            },
            minPrice: minPrice,
            maxPrice: maxPrice,
        });
    }

    const getJsonAvailablesLocation = () => {
        return JSON.stringify({
            titleType: titleType,
            mainType: mainType,
            subType: subType,
            brandType: brandType
        })
    }

    const getJsonAvailablesBrand = () => {
        return JSON.stringify({
            titleType: titleType,
            mainType: mainType,
            subType: subType,
            locations: location
        });
    }

    const getJsonAvailablesSub = () => {
        return JSON.stringify({
            titleType: titleType,
            mainType: mainType,
            brandType: brandType,
            locations: location
        });
    }

    const getJsonAvailablesMain = () => {
        return JSON.stringify({
            titleType: titleType,
            subType: subType,
            brandType: brandType,
            locations: location
        });
    }

    const handleUpdate = async (title) => {
        fetchAvailableSub(getJsonAvailablesSub());
        fetchAvailableMain(getJsonAvailablesMain());
        fetchAvailableBrand(getJsonAvailablesBrand());
        fetchAvailableLocation(getJsonAvailablesLocation())
        fetchDataByParams(getJson(title));
    }

    const handleDefault = () => {
        setTitle('')
        handleUpdate('')
    }

    useEffect(() => {
        setBrandType([])
        setMainType([])
        setSubType([])
        setLocation([])
    }, [titleType])

    useEffect(() =>  {
        handleUpdate(title);
    }, [titleType, mainType, brandType, subType, location, minPrice, maxPrice])

    const indexOfLastAdvert = currentPage * advertsPerPage;
    const indexOfFirstAdvert = indexOfLastAdvert - advertsPerPage;
    const currentAdverts = adverts.slice(indexOfFirstAdvert, indexOfLastAdvert);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        return pageNumber;
    }
    
    const titleWord = {
        marginTop: '-24px',
        backgroundImage : `url(${Coffe})`,
        height: '250px',
        color: 'white',
        padding: '40px 0 22px',
        fontSize: '40px',
    }

    return (
        <div>
            <div
             style={titleWord}
            >
                Объявления
                <Hr
                 color={'white'}
                />
            </div>

            <div style={{
                display: 'table',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                <div className={cl.advertWrapper}>
                    <div className={cl.searchArea}>
                        <div>
                            {titleType == '' ?
                            <></>
                            :
                            <SearchElement
                            title={titleType} 
                            mainHandler={toggleMain}
                            subHandler={toggleSub}
                            brandHandler={toggleBrand}
                            locationHandler={toggleLocation}
                            brandAvailables={brandAvailables}
                            subAvailables={subAvailables}
                            mainAvailables={mainAvailables}
                            locationAvailables={locationAvailables}
                            />
                            }
                        </div>
                    </div>

                    <div className={cl.rightArea}>
                        <div className={cl.precisionSearchArea}>
                            <div style={{marginTop : '5px'}}> 
                            <Dropdown>
                                <Dropdown.Toggle as={Button} variant="white" id="dropdown-basic">
                                    Каталог 
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={(e) => setTitleType('auto')}>
                                        Авто
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setTitleType('property')}>
                                        Недвижимость
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setTitleType('tech')}>
                                        Техника
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setTitleType('sport')}>
                                        Спорт и отдых
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => setTitleType('study')}>
                                        Учёба
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>

                            <div style={{
                                paddingLeft: '20px',
                                paddingRight: '20px'
                            }}>
                            <Input
                             style={{
                                width: '450px',
                                paddingLeft: '20px'
                            }}
                             value={title}
                             placeholder='поиск..'
                             onChange={(e) => setTitle(e.target.value)}
                            />
                            </div>
                            
                            <div style={{display: 'flex', gap: '1rem', marginTop: '5px'}}>
                                <div>
                                    <Button
                                    onClick={handleDefault}
                                    style={{
                                        color: 'black',
                                        backgroundColor: 'white',
                                    }}
                                    >Очистить
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={(e) => handleUpdate(title)}>Поиск</Button>
                                </div>
                            </div>


                        </div>

                        {loading
                        ?
                        <div>
                            {/* Spinner */}
                        </div>
                        :
                        <SearchedAdverts
                            currentAdverts={currentAdverts}
                            advertsPerPage={advertsPerPage}
                            adverts={adverts}
                            paginate={paginate}
                            style={{
                                marginLeft: 'auto',
                                maxWidth: '900px',
                            }}
                            isPageable
                        />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdvertsPage
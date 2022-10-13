import React, {useState, useEffect} from 'react'
import Laptop from '../images/laptop.jpg'
import Bis from '../images/business.jpg'
import Image from '../components/ui/img/Image'
import work from '../images/icons/work.png'
import edu from '../images/icons/edu.png'
import store from '../images/icons/store.png'
import job from '../images/icons/job.png'
import property from '../images/icons/property.png'
import love from '../images/icons/love.png'
import chat from '../images/icons/chat.png'
import auto from '../images/icons/auto.png'
import animal from '../images/icons/animal.png'
import TypeLink from '../components/ui/typeButton/TypeButton'
import Hr from '../components/ui/hr/Hr'
import AdvertService from '../service/AdvertService'
import SearchedAdverts from './advert/SearchedAdverts'
import Earth from '../images/icons/earth.png'
import Rating from '../images/icons/rating.png'
import Star from '../images/icons/star.png'
import Dot from '../components/ui/dot/Dot'
import Button from '../components/ui/button/Button'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const [loading, setLoading] = useState(false);
  const [latestAdverts, setLatestAdverts] = useState([]);
  const [exampleAdverts, setExampleAdverts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [advertsPerPage] = useState(3);
  const nav = useNavigate();

  const Navigate = () => {
    nav('/adverts');
  }

  const fetchLatest = async () => {
    try {
      const response = await AdvertService.getAll();
      setLatestAdverts(response.data);
    } catch (error) {
        console.log(error.message);            
    }
  }

  const fetchExamples = async () => {
    try {
      const response = await AdvertService.getAll();
      setExampleAdverts(response.data);
    } catch (error) {
        console.log(error.message);            
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchLatest();
    fetchExamples();
    setLoading(false);
  }, [])
  
  const indexOfLastAdvert = currentPage * advertsPerPage;
  const indexOfFirstAdvert = indexOfLastAdvert - advertsPerPage;
  const currentAdverts = exampleAdverts.slice(indexOfFirstAdvert, indexOfLastAdvert);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const wrapper = {
    minWidth: '100%',
    minHeight: 'auto',
  }
  
  const header = {
    marginTop: '-25px',
    minHeight: '600px',
    marginBottom: '60px',
    width: 'auto',
    color: 'white',
    textAlign: 'center',
    backgroundImage : `url(${Bis})`,
  }

  const title = {
    fontSize: '50px',
    paddingTop: '100px',
  }

  const category = {
    background: 'rgba(255, 255, 255, 0.1)',
  }

  const DotStyle = {
    height: '100px',
    width: '100px',
  }

  const areaStyle = {
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return (
    <div>
      <div style={wrapper}>

      <div style={header}>

        <div style={title}>
         BUY|SELL ОБЪЯВЛЕНИЯ
        </div>
        <div style={{
          fontSize: '20px',
        }}>
        Легко купить, легко продать
        </div>

        <div style={{
          textAlign: 'center',
          margin : '58px 0 0',
        }}>
          <TypeLink image={work}>
            Услуги
          </TypeLink>
          <TypeLink image={auto}>
            Авто-мото
          </TypeLink>
          <TypeLink image={animal}>
            Животные
          </TypeLink>
          <TypeLink image={chat}>
            Общение
          </TypeLink>
          <TypeLink image={property}>
            Недвижимость
          </TypeLink>
          <TypeLink image={store}>
            Продажа
          </TypeLink>
          <TypeLink image={job}>
            Работа
          </TypeLink>
          <TypeLink image={love}>
            Знакомства
          </TypeLink>
          <TypeLink image={edu}>
            Обучение
          </TypeLink>
        </div>
        
      </div>

      <div style={{
        marginBottom: '60px',
      }}>
        <div style={{
          fontSize: '36px',
          textAlign: 'center',
        }}>
          Разместите своё объявление
        </div>
        <Hr color={'black'}/>
        <div style={{
          textAlign: 'center',
          color: '#959494',
          fontSize: '16px',
        }}>
          Ниже представлены примеры объявлений
        </div>
        
        <div style={{
          textAlign: 'center'
        }}>
        {loading
        ?
        <div></div>
        :
        <div>
          <SearchedAdverts
            currentAdverts={currentAdverts}
            advertsPerPage={advertsPerPage}
            adverts={exampleAdverts}
            paginate={paginate}
            isPagable
            />
        </div>
        }
        </div>
        
      </div>

      <div style={{
        color: 'white',
        minHeight: '500px',
        marginBottom: '60px',
        backgroundImage : `url(${Laptop})`,
      }}>

      <div style={{
        fontSize: '36px',
        color: 'white',
        textAlign: 'center',
        paddingTop: '50px',
      }}>
        Всё что Вам нужно в одном месте
      </div>
        <Hr color={'white'}/>
        
        <div style={{
          display: 'flex',
          margin: '70px 0 20px',
        }}>
          <div style={areaStyle}>
            <Dot style={DotStyle}>
              <Image src={Earth} alt='typeLogo'/>
            </Dot>
            <div>Сотни мест</div>
            <div style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '18em',
            }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, totam!
            </div>
          </div>

          <div style={areaStyle}>
            <Dot style={DotStyle}>
              <Image src={Star} alt='typeLogo'/>
            </Dot>
            <div>Лучшие предложения</div>
            <div style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '18em',
            }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, totam!
            </div>
          </div>

          <div style={areaStyle}>
            <Dot style={DotStyle}>
              <Image src={Rating} alt='typeLogo'/>
            </Dot>
            <div>Большой выбор</div>
            <div style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '18em',
            }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, totam!
            </div>
          </div>

        </div>

      </div>
        
        <div style={{
          fontSize: '36px',
          textAlign: 'center',
      }}>
          Последние объявления
        </div>
        <Hr/>
        <div style={{
          marginBottom: '30px',
          textAlign: 'center',
          color: '#959494',
          fontSize: '16px',
        }}>
          Посмотрите некоторые из лучших предложений со всего мира от наших партнеров и друзей.
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}>
        {loading
        ?
        <div></div>
        :
        <div style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '70vw',
        }}>
          <SearchedAdverts
            currentAdverts={latestAdverts}
            />
        </div>
        }
        </div>

          <Button
           onClick={Navigate}
           style={{
            fontSize: '25px',
            margin: '30px',
            padding: '15px',
           }}
          >
            Все объявления
          </Button>
      </div>
    </div>
  );
}

export default HomePage;
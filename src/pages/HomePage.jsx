import React from 'react'
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

const HomePage = () => {

  const wrapper = {
    minWidth: '100vw',
    minHeight: 'auto',
  }

  const header = {
    marginTop: '-25px',
    minHeight: '600px',
    width: '100vw',
    color: 'white',
    textAlign: 'center',
    backgroundImage : `url(${Bis})`,
    backgroundRepeat: 'no-repeat',
  }

  const title = {
    fontSize: '50px',
    paddingTop: '100px',
  }

  const category = {
    background: 'rgba(255, 255, 255, 0.1)',
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
        </div>
        
      </div>

      <div>
        Всё что Вам нужно в одном месте
      </div>

      </div>
    </div>
  );
}

export default HomePage
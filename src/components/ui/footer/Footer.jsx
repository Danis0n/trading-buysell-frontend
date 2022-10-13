import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Phone from '../../../images/icons/phone.png'
import Mail from '../../../images/icons/mail.png'

const Footer = () => {

    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const widget = {
        fontSize: '16px',
        display: 'inline-block',
        padding: '0 30px',
        verticalAlign: 'top',
        width: '32.5%',
    }

    const info = {
        fontSize: '16px',
        display: 'inline-block',
        margin: '5px 50px',
    }

    const link = {
        textDecoration: 'none',
        color: 'white',
    }

  return (
    <div
     style={{
        color: 'white',
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
     }}
    >
        <div style={{
            padding: '30px 120px 20px',
            textAlign: 'center',
            backgroundColor: '#313131',
        }}>
            <div style={widget}>
                 <a
                  href='https://github.com/Danis0n'
                  style={link}
                 >
                  GITHUB
                 </a>
                <div style={{fontSize: '16px'}}>
                 Здесь Вы можете вставить виджет социальной сети,
                 любой другой виджет или просто текст.
                </div>
            </div>
            <div style={widget}>
                <a
                 href='https://vk.com/danis0n'
                 style={link}
                >
                  VK
                </a>
                <div style={{fontSize: '16px'}}>
                 Здесь Вы можете вставить виджет социальной сети, 
                 любой другой виджет или просто текст.
                </div>
            </div>
            <div style={widget}>
                <a
                 href='https://vk.com/danis0n'
                 style={link}
                >
                  DISCORD
                </a>
                <div style={{fontSize: '16px'}}>
                 Здесь Вы можете вставить виджет социальной сети, 
                 любой другой виджет или просто текст.
                </div>
            </div>
        </div>

        <div style={{
            margin: '0 auto',
            padding: '20px 20px',
            backgroundColor: '#292929',
        }}>
            <div style={info}>
                Брянск
            </div>
            <div style={info}>
                <div style={{
                    margin: '-1px 19px 0 0',
                    display: 'inline-block',
                    backgroundImage: `url(${Phone})`,
                    width: '15px',
                    height: '15px'
                }}></div>
                +79204365405
            </div>
            <div style={info}>
                <div style={{
                        display: 'inline-block',
                        margin: '-1px 19px -3px 0',
                        backgroundImage: `url(${Mail})`,
                        backgroundRepeat: 'no-repeat',
                        width: '15px',
                        height: '15px'
                    }}></div>
                mail@domain.com
            </div>
        </div>

        <div style={{
            padding: '20px 0',
            backgroundColor: '#212121',
        }}>
            <div style={{
                float: 'left',
                width: '50%',
            }}>
                <Link
                
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                 to={'/about'}
                 style={{
                    fontSize: '16px',
                    textDecoration: 'none',
                    color: isHover ? '#AE2519' : 'white',
                 }}
                >
                  Контакты
                </Link>
            </div>
            <div
             style={{
                fontSize: '16px',
                padding: '7px',
             }}
            >
                ©2022. BUY | SELL </div>
        </div>

    </div>
  )
}

export default Footer
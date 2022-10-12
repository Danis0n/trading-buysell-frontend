import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Image from '../img/Image'

const TypeLink = ({children, image}) => {

    const [isHover, setIsHover] = useState(false);

    const handleEnter = () => {
        setIsHover(true);
    }

    const handleLeave = () => {
        setIsHover(false);
    }

    const style = {
        background: isHover ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
        transition: 'all 250ms',
        minWidth: '95px',
        minHeight: '95px',
        margin: '100px 1px 5px',
        borderRadius: '4px',
        verticalAlign: 'top',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
    }
    
    const text = {
        padding: '0 2px',
        color: 'white',
        fontSize: '14px',
        verticalAlign: 'top',
        display: 'inline-block',
    }

  return (
    <Link
     onMouseEnter={handleEnter}
     onMouseLeave={handleLeave}
     style={style}
     to="/adverts"
    >   
        <div
         style={{
            height: '30px',
            margin: '15px',
            display: 'block',
        }}
        >
            <Image src={image} alt='img'></Image>
        </div>
        <div style={text}>
            {children}
        </div>
    </Link>
  )
}

export default TypeLink
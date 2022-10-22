import React, {useState} from 'react'
import Image from '../../components/ui/img/Image'
import cl from '../../styles/advert/AdvertElement.module.css'
import map from '../../utils/ImageUtil'
import Dot from '../../components/ui/dot/Dot'
import CustomLink from '../../components/ui/link/CustomLink'

const AdvertElement = ({advert}) => {

  const [isHover, setIsHover] = useState(false);

  const element = {
    width: '254px',
    textAlign: 'center',
    position: 'relative',
    display: 'inline-block',
    paddingTop: '10px',
    // paddingBottom: '30px',
    boxShadow: '0 0 16px rgb(109 109 109 / 25%)',
    margin: '20px',
  }

  const handleMouseEnter = () => {
    setIsHover(true);
  }

  const handleMouseLeave = () => {
    setIsHover(false);
  }

  const elementStyle = {
    backgroundColor: isHover? '#FFF1C9' : 'white',
  }

  return (
    <div
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}
     style={element}
     key={advert.id}
    >
      <CustomLink to={`/adverts/${advert.id}`}>
        <Image src={advert.images[0].url} width='250' height='200' alt='logo'/>
      </CustomLink>
        
      <div className={cl.imageType}>
        <CustomLink to={`/adverts/${advert.id}`}>
          <Dot>
            <Image src={map.get(advert?.type?.name)} alt='typeLogo'/>
          </Dot>
        </CustomLink>
      </div>

      <div
        style={elementStyle}
        >
        <div className={cl.itemDate}>
          {advert.dateOfCreation.substring(0,10)}
        </div>
        <div className={cl.itemTitle}>
          {advert.title}
        </div>
        <div className={cl.itemDescription}>
          {advert.description}
        </div>
        <div className={cl.itemPrice}>
          {advert.price} 
        </div>
      </div>

    </div>
  )
}

export default AdvertElement
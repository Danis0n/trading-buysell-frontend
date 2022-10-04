import React from 'react'
import Image from '../../components/ui/img/Image'
import cl from '../../styles/advert/AdvertElement.module.css'
import map from '../../utils/ImageUtil'
import Dot from '../../components/ui/dot/Dot'
import CustomLink from '../../components/ui/link/CustomLink'

const AdvertElement = ({advert}) => {

  return (
    <div
     className={cl.element}
     key={advert.id}
    >
        <Image src={advert.images[0].url} width='250' height='200' alt='logo'/>
        
        <div className={cl.imageType}>
          <CustomLink to={`${advert.id}`}>
            <Dot>
              <Image src={map.get(advert?.type?.name)} alt='typeLogo'/>
            </Dot>
          </CustomLink>
        </div>

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
  )
}

export default AdvertElement
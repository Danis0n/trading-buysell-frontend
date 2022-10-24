import React, {useState} from 'react'
import Image from '../../components/ui/img/Image'
import cl from '../../styles/advert/AdvertElement.module.css'
import map from '../../utils/ImageUtil'
import Dot from '../../components/ui/dot/Dot'
import CustomLink from '../../components/ui/link/CustomLink'
import AdvertService from '../../service/AdvertService'
import Confirm from '../../components/ui/confirm/Confirm'
import Modal from '../../components/ui/modal/Modal'
import Button from '../../components/ui/button/Button'


const AdvertElement = ({advert, isAdmin}) => {

  const [isHover, setIsHover] = useState(false);
  const linkToAdvert = `/adverts/${advert.id}`

  const [confirmModal, setConfirmModal] = useState(false)


  async function handleDelete() {
    setConfirmModal(false);
    try {
        const response = await AdvertService.delete(advert.id);
        console.log(response);
    } catch (error) {
        console.log(error);  
    }
  }

  const element = {
    width: '254px',
    textAlign: 'center',
    position: 'relative',
    display: 'inline-block',
    paddingTop: '10px',
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
      <CustomLink to={linkToAdvert}>
        <Image src={advert.images[0].url} width='250' height='200' alt='logo'/>
      </CustomLink>
        
      <div className={cl.imageType}>
        <CustomLink to={linkToAdvert}>
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
        <CustomLink to={linkToAdvert}>
        <div className={cl.itemTitle}>
          {advert.title}
        </div>
        </CustomLink>
        <div className={cl.itemDescription}>
          {advert.description}
        </div>
        <div className={cl.itemPrice}>
          {advert.price} 
        </div>
      </div>

      <div>
        {isAdmin
        ?
        <div style={{margin: '20px'}}>
          <Button
           onClick={() => setConfirmModal(true)}
           style={{
            backgroundColor: 'white',
            color: 'black'
           }}
          >
            Удалить
          </Button>

          <Modal
            visible={confirmModal}
            setVisible={setConfirmModal}
          >
            <Confirm
              handleCancel={() => setConfirmModal(false)}
              handleItem={handleDelete}
              message='Вы точно хотите удалить объявление?'
              link={`/user/${advert?.userId}/adverts`}
              />
          </Modal>

        </div>
        :
        <></>
        }
      </div>

    </div>
  )
}

export default AdvertElement
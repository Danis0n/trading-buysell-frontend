import React, {useState} from 'react'
import Button from '../../../components/ui/button/Button'
import AdminService from '../../../service/AdminService'
import Modal from '../../../components/ui/modal/Modal'
import NotifyUser from './NotifyUser'
import CustomLink from '../../../components/ui/link/CustomLink'

const AdvertAdminElement = ({advert}) => {

    const [message, setMessage] = useState('');
    const [modalAdmin, setModalAdmin] = useState(false)
    const [modalHideAdmin, setModalHideAdmin] = useState(false)

    const getMessageJson = () => {
        return JSON.stringify({
            message: message
        })
    }

    const powerDelete = async (id, message) => {
        try {
            const response = await AdminService.powerDeleteById(id, message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelAdmin = () => {
        setModalAdmin(false);
        setMessage('')
    }

    const handleSubmitAdmin = (id, message, action) => {
        setModalAdmin(false);
        window.location.reload();
        action(id, getMessageJson(message));
    }
    
    const handleCancelHideAdmin = () => {
        setModalHideAdmin(false);
        setMessage('');
    }
    
    const handleSubmitHideAdmin = (id, userId, message, action) => {
        setModalHideAdmin(false);
        window.location.reload();
        action(id, userId, getMessageJson(message));
    }
    
    const powerHideById = async (id, userId, message) => {
        try {
            const response = await AdminService.powerHideById(id, userId, message);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const powerUnHideById = async (id, userId, message) => {
        try {
            const response = await AdminService.powerUnHideById(id, userId, message);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const style = {
        minWidth: '900px',
        padding: '25px 20px',
        margin: '20px 10px',
        boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
        borderRadius: '10px',
    }

    const btnStyle = {
        color : 'black',
        backgroundColor: 'white'
    }

  return (
    <div style={style}>
        <div style={{
            margin: '10px',
            width: 'auto',
            display: 'flex',
            gap: '1.5rem',
        }}>
            <div style={{marginLeft: 'auto'}}>
            <CustomLink to={`/advert/${advert.id}`}>
            | Название: {advert.title} |
            </CustomLink>
            </div>
            <div style={{display: 'flex', gap: '0.5rem', marginLeft: 'auto'}}>
            | Скрыто пользователем: {advert?.isHidden ? <p> Да </p> : <p> Нет </p>} |
            </div>
            <div style={{display: 'flex', gap: '0.5rem', marginLeft: 'auto'}}>
            | Дата создания: {advert.dateOfCreation.substring(0,10)} |
            </div>
            {advert.isHiddenByAdmin ?
            <div>
                <Button style={btnStyle} onClick={() => setModalHideAdmin(true)}>
                    Разграничить доступ</Button>
            </div>
            :
            <div>
                <Button style={btnStyle} onClick={() => setModalHideAdmin(true)}>
                    Ограничить доступ</Button>
            </div>
            }
            <Modal
                visible={modalHideAdmin}
                setVisible={setModalHideAdmin}
            >
            <NotifyUser
                handleCancel={() => handleCancelHideAdmin()}
                handleSubmit={() => handleSubmitHideAdmin(advert.id, advert.userId, getMessageJson(), 
                advert.isHiddenByAdmin ? powerUnHideById : powerHideById)
                }
                text={'Админ панель: Укажите причину действия'}
                message={message}
                setMessage={setMessage}
            />
            </Modal>
            
            <div>
            <Button onClick={() => setModalAdmin(true)} >Удалить</Button>
            </div>

            <Modal
                visible={modalAdmin}
                setVisible={setModalAdmin}
            >
            <NotifyUser
                handleCancel={() => handleCancelAdmin()}
                handleSubmit={() => handleSubmitAdmin(advert.id, getMessageJson(), powerDelete)
                }
                text={'Админ панель: Укажите причину действия'}
                message={message}
                setMessage={setMessage}
            />
            </Modal>

        </div>
    </div>
  )
}

export default AdvertAdminElement
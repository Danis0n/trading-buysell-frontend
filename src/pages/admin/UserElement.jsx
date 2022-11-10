import React, {useState} from 'react'
import AdminService from '../../service/AdminService'
import Button from '../../components/ui/button/Button'
import Modal from '../../components/ui/modal/Modal'
import NotifyUser from './NotifyUser'

const UserElement = ({user, meId}) => {

  const [modalBan, setModalBan] = useState(false);
  const [message, setMessage] = useState('');

  const handleCancel = () => {
    setMessage('');
    setModalBan(false);
  }

  const handleSubmit = (id,message, action) => {
    setModalBan(false);
    action(id,message);
  }

  const banUser = async (id,message) => {
    try {
      const response = await AdminService.banUser(id,message);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const unBanUser = async (id,message) => {
    try {
      const response = await AdminService.unBanUser(id,message);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getMessageJson = () => {
    return JSON.stringify({
        message: message
    })
}

  const style = {
    minWidth: '900px',
    padding: '20px 20px',
    margin: '20px 10px',
    boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
    borderRadius: '10px',
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
          | Логин: {user.username} |
        </div>
        <div style={{display: 'flex', gap: '0.5rem', marginLeft: 'auto'}}>
          | Состояние: {user.locked ? <p> Заблокирован </p> : <p> Не заблокирован </p>} |
        </div>
        <div style={{display: 'flex', gap: '0.5rem', marginLeft: 'auto'}}>
          | Активирован: {user.enabled ? <p> Да </p> : <p> Нет </p>} |
        </div>
        <div style={{display: 'flex', gap: '0.5rem', marginLeft: 'auto'}}>
          | Дата регистрации: {user.info.dateOfCreation.substring(0,10)} |
        </div>
        <div style={{display: 'flex', gap: '0.5rem', marginLeft: 'auto'}}>
          | Рейтинг: {user.info.rating} |
        </div>

        <div style={{marginLeft: 'auto'}}>
          {user.id === meId ?
          <></>
          :
          <div>
          {user.locked ?
            <Button onClick={() => setModalBan(true)}>Разблокировать</Button>
            :
            <Button onClick={() => setModalBan(true)}>Заблокировать</Button>
          }
          <Modal
            visible={modalBan}
            setVisible={setModalBan}
          >
          <NotifyUser
            handleCancel={() => handleCancel()}
            handleSubmit={() => handleSubmit(user.id,getMessageJson(), 
              user.locked ? unBanUser : banUser)
            }
            text={'Админ панель: Укажите причину действия'}
            message={message}
            setMessage={setMessage}
          />
          </Modal>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default UserElement
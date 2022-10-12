import React, {useState} from 'react'
import CustomLink from '../link/CustomLink'
import Button from '../button/Button'
import { useAuth } from '../../hook/useAuth'
import LoginForm from '../login/LoginForm'
import Modal from '../modal/Modal'
import Confirm from '../confirm/Confirm'

const Navbar = ({isAuth}) => {

    const {store} = useAuth();
    const [loginModal, setLoginModal] = useState(false)
    const [exitModal, setExitModal] = useState(false)

    const handleCancel = (e) => {
        e.preventDefault();
        setExitModal(false);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginModal(false);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        setExitModal(false);
        store.logout();
    }

    const navbar = {
        marginBottom: '25px',
        height: '70px',
        display: 'grid',
        width: '99vw',
        alignItems: 'center',
        padding:'0 15px',
        boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
    }

    const linksArea = {
        margin: '0 400px',
        textAlign : 'center',
        display : 'flex',
        justifyContent : 'space-between',
    }

    const catalog = {
        marginTop: '5px',
    }

    const buttons = {
        display: 'flex',
        margin: '0 20px',
    }

  return (
    <div style={navbar}>
      <div style={linksArea}>
        
        <div style={catalog}>
          Лого
        </div>

        <div style={catalog}>
          <CustomLink to='/'>Главная</CustomLink>
        </div>

        <div style={catalog}>
          <CustomLink to='/about'>Контакты</CustomLink>
        </div>

        <div style={buttons}>
            <div
             style={{
             marginRight : '20px',
            }}>
                <Button>Добавить объявление</Button>
            </div>

            {isAuth
            ?
            <div>
            <Button
             style={{
                backgroundColor : 'white',
                color: 'black',
                }}
             onClick={() => setExitModal(true)}>
                Выйти
            </Button>
            <Modal
             visible={exitModal}
             setVisible={setExitModal}
            >
                <Confirm
                 handleItem={handleLogout}
                 handleCancel={handleCancel}
                 message={'Вы точно хотите выйти?'}
                />
            </Modal>
            </div>
            :
            <div>
                <Button
                 style={{
                    backgroundColor : 'white',
                    color: 'black',
                    }}
                    onClick={() => setLoginModal(true)}
                >
                    Войти
                </Button>
                <Modal
                 visible={loginModal}
                 setVisible={setLoginModal}
                >
                    <LoginForm handleLogin={handleLogin}/>
                </Modal>
            </div>
            }
        </div>

      </div>
    </div>
  )
}

export default Navbar
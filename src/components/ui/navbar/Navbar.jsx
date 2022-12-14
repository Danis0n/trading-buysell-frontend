import React, {useState} from 'react'
import CustomLink from '../link/CustomLink'
import Button from '../button/Button'
import { useAuth } from '../../hook/useAuth'
import LoginForm from '../login/LoginForm'
import Modal from '../modal/Modal'
import Confirm from '../confirm/Confirm'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/esm/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import menu from '../../../images/icons/menu.png'
import Image from '../img/Image'
import user from '../../../images/icons/user.png'

const Navbar = ({isAuth, isEnable, isLocked, isAdmin, hasNewNotifications}) => {

    const {store} = useAuth();
    const [userId, setUserId] = useState(store?.user?.id)
    const [loginModal, setLoginModal] = useState(false)
    const [mailConfirmModal, setMailConfirmModal] = useState(false)
    const [exitModal, setExitModal] = useState(false)
    const nav = useNavigate();

    const handleCancel = (e) => {
        e.preventDefault();
        setExitModal(false);
    }

    const handleLogin = (e) => {
        setLoginModal(false);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        setExitModal(false);
        store.logout();
    }

    const handleSubmit = (e) => {
        if(!isAuth) setLoginModal(true);
        else 
            nav('/advert/create');
    }

    const navbar = {
        width: '100%',
        marginBottom: '25px',
        height: 'auto',
        alignItems: 'center',
        padding:'0 15px',
        boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
    }

    const linksArea = {
        width: '70%',
        margin: '0 auto',
        textAlign : 'center',
        display : 'flex',
        justifyContent : 'space-between',
    }

    const catalog = {
        textTransform: 'uppercase',
        margin: '30px 10px',
    }

    const buttons = {
        display: 'flex',
        margin: '25px 20px',
    }

  return (
    <div style={navbar}>
      <div style={linksArea}>
        
        <div style={catalog}>
          <Image style={{marginTop: '-10px'}} src={user} alt='logo' width='50px'/>
        </div>

        <div style={catalog}>
          <CustomLink to='/'>??????????????</CustomLink>
        </div>
        <div style={catalog}>
          <CustomLink to='/about'>????????????????</CustomLink>
        </div>
        <div style={catalog}>
          <CustomLink to='/adverts'>????????????????????</CustomLink>
        </div>

        <div style={buttons}>
            {isAuth && isEnable && !isLocked ? 
                <div style={{ marginRight : '20px' }}>
                    <Button onClick={handleSubmit}>???????????????? ????????????????????</Button>
                </div>
            :
                <div>
                {!isEnable && isAuth?
                    <div style={{ marginRight : '20px' }}>
                        <Button style={{ backgroundColor: 'grey' }} onClick={() => setMailConfirmModal(true)}>
                            ???????????????? ????????????????????
                        </Button>
                        <Modal
                            visible={mailConfirmModal}
                            setVisible={setMailConfirmModal}
                        >
                            <div>
                                <div style={{fontSize: '25px', marginBottom: '10px'}}>
                                    ???????????????? ???????????????????? ???????????????? ???????????? ?????????? ?????????????????????????? ????. ??????????
                                </div>
                                <div>
                                    ???????????? ???? ??????????????????????????? <a
                                     style={{textDecoration: 'none'}}
                                     href={`/user/${userId}/settings`}
                                    >??????????????????</a>
                                </div>
                            </div>
                        </Modal>
                    </div>
                :
                    <div>
                        {isAuth && isLocked ?
                        <div>
                            <Button>???????????????????????? ????????????????????????</Button>
                        </div>
                        :
                        <></>
                        }
                    </div>
                }
                </div>
            }
            
            <div style={{display: 'inline-block'}}>
            {isAuth
            ?
            <div >
                <Modal
                  visible={exitModal}
                  setVisible={setExitModal}
                >
                    <Confirm
                    handleItem={handleLogout}
                    handleCancel={handleCancel}
                    message={'???? ?????????? ???????????? ???????????'}
                    />
                </Modal>

                <div style={{margin: '-5px', display: 'flex', gap: '1rem'}}>
                <Dropdown>
                    <Dropdown.Toggle variant="white" id="dropdown-basic">
                        <div style={{display: 'flex', gap: '1rem'}}>
                        {hasNewNotifications ?
                        <div style={{color: 'red'}}>{hasNewNotifications}</div>
                        :
                        <></>
                        }
                        <Image src={menu}/> 
                        </div>
                    </Dropdown.Toggle>
                
                    <Dropdown.Menu>
                        <Dropdown.Item href={`/user/${userId}`}>
                            ??????????????
                        </Dropdown.Item>
                        <Dropdown.Item href={`/user/${userId}/adverts`}>
                            ????????????????????
                        </Dropdown.Item>
                        {isAdmin ?
                        <Dropdown.Item href={`/admin`}>
                            ?????????? ????????????
                        </Dropdown.Item>
                        :
                        <></>
                        }
                        <Dropdown.Item href={`/notifications`}>
                            {hasNewNotifications > 0 ?
                            <div style={{display: "flex", gap: '0.5rem'}}>
                            <div>??????????????????????: </div> 
                            <div style={{color: 'red'}}>??????????: {hasNewNotifications}</div>
                            </div>
                            :
                            <div>??????????????????????</div>
                            }   
                        </Dropdown.Item>
                        <Dropdown.Item href={`/user/${userId}/settings`}>
                            ??????????????????
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setExitModal(true)}>
                            ??????????
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>

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
                     ??????????
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
    </div>
  )
}

export default Navbar
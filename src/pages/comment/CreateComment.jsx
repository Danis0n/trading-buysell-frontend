import React, {useState} from 'react'
import { useAuth } from '../../components/hook/useAuth'
import CommentService from '../../service/CommentService'
import Input from '../../components/ui/input/Input'
import Textarea from '../../components/ui/textarea/Textarea'
import Button from '../../components/ui/button/Button'
import LoginForm from '../../components/ui/login/LoginForm'
import Modal from '../../components/ui/modal/Modal'

const CreateComment = ({id, myId}) => {

  const {store} = useAuth();
  const [isAllowed, setIsAllowed] = useState(true);
  const [loginModal, setLoginModal] = useState(false)
  const [isAuth, setIsAuth] = useState(true);
  const [userId, setUserId] = useState(id);
  const [myUserId, setMyUserId] = useState(myId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [advertName, setAdvertName] = useState('none');

  const create = async (id, myId, title, description, rating, advertName) => {
    try {
      const response = await CommentService.create(
        id, myId, advertName,
        title, description, rating 
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = (e) => {
    setLoginModal(false);
}

  const checkInputs = () => {
    if( title !== '' && description !== '' && ( !isNaN(rating))) {
      if(title.length < 100 && description.length < 5000){
        setIsAllowed(true);
        return true;
      }
    }

    setIsAllowed(false);
    return false;
  }

  const checkAuth = () => {
    if(!store.isAuth) {
      setIsAuth(false);
      setLoginModal(true);
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(checkAuth() && checkInputs()) {
      create(userId, myUserId, title, description, rating, advertName);
    }
    else {
      return;
    }
  }

  const inputStyle = {
    margin: '20px',
  }

  const wrapper = {
    padding: '30px',
    borderRadius: '5px',
    boxShadow: '0 0 16px rgb(109 109 109 / 25%)',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '50px',
    display: 'table',
    maxWidth: '900px'
  }

  return (
    <div style={wrapper}>
      <div
       style={{
        display: 'flex',
       }}
      >
        <div>
            Ваша оценка
            <Input
              placeholder={'1-5'}
              style={inputStyle}
              type="text"
              value={rating}
              onChange={e => setRating(e.target.value)}
            />
        </div>

        <div>
            Тема
            <Input
              placeholder={'Не более 100 символов'}
              style={inputStyle}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
        </div>

        <div>
          {!isAllowed || !isAuth
          ?
            <div>
              {!isAllowed
              ?
                <div
                 style={{
                  marginTop: '40px',
                  textAlign: 'justify',
                  color: 'red',
                 }}
                >
                  Пожалуйста, заполните все поля корректно!
                </div>
              :
                <></>
              }

              {!isAuth
              ?
              <div>
                <Modal
                  visible={loginModal}
                  setVisible={setLoginModal}
                >
                  <LoginForm handleLogin={handleLogin}/>
                </Modal>
              </div>
              :
              <></>
              }
            </div>
          :
            <> 
            </>
          }
        </div>

      </div>

      Описание
      <div style={{
        marginTop: '20px',
      }}>
          <Textarea
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '900px',
              height: '100px',
            }}
            placeholder={'Не более 5000 символов'}
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
      </div>

      <Button 
       onClick={handleSubmit}
      >
        Отправить
      </Button>

    </div>
  )
}

export default CreateComment
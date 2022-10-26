import React, {useState, useEffect} from 'react'
import Hr from '../../components/ui/hr/Hr';
import { useNavigate, useParams } from 'react-router-dom';
import { pageTitleText, wrapper } from '../../utils/StyleUtil'
import Button from '../../components/ui/button/Button';
import Input from '../../components/ui/input/Input';
import { useAuth } from '../../components/hook/useAuth';
import UserService from '../../service/UserService';

const UserSettings = () => {

  const id = useParams();
  const nav = useNavigate();
  const {store} = useAuth();
  const userId = store?.user?.id;
  const oldName = store?.user?.info?.name;
  const oldEmail = store?.user?.info?.email;
  const oldPhone = store?.user?.info?.phone;

  const [newName, setNewName] = useState(oldName);
  const [newEmail, setNewEmail] = useState(oldEmail);
  const [newPhone, setNewPhone] = useState(oldPhone);
  const [newPassword, setNewPassword] = useState('');
  const [newRepeatPassword, setNewRepeatPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const [passwordMessage, setPasswordMessage] = useState(false);
  const [nameMessage, setNameMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false)
  const [isValid, setIsValid] = useState(true);

  const form = {
    textAlign: 'center',
    alignItems: 'center',
    padding: '50px 10px',
    width: '600px',
    height: 'auto',
    boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
  }

  const handleCheck = () => {
    if(!store.isAuth && userId !== id){
      nav('/');
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => handleCheck(), 500);
    return () => clearTimeout(timer);

  }, [])
  

  const handleSettings = async () => {

    const isName = isNameValid(newName, oldName);
    const isPass = isPasswordValid(newPassword, newRepeatPassword, oldPassword);
    const isEmail = isEmailValid(newEmail, oldEmail);
    const isPhone = isPhoneValid(newPhone, oldPhone);
    const isValid = isName && isPass && isEmail && isPhone;

    if(!isName){
      setNameMessage(true);
    }

    if(!isPass){
      setPasswordMessage(true);
    }

    if(!isEmail){
      setEmailMessage(true);
    }

    if(isValid) {
      handleEmail(newEmail,oldEmail);
      handleName(newName,oldName);
      handlePassword(newPassword,oldPassword);
      handlePhone(newPhone,oldPhone);
    }

  }

  const isNameValid = (newName, oldName) => {
    return (newName !== oldName && newName.length >= 5 && newName.length <= 30) || 
      (newName === oldName);
  }

  const isPasswordValid = (newPassword, newRepeatPassword, oldPassword) => {
    return (newPassword.length >= 8 && newPassword.length <= 20 &&
      newPassword == newRepeatPassword && newPassword !== oldPassword && oldPassword != '') || 
      (oldPassword == '' && newPassword == '' && newRepeatPassword == '')
  }

  const isEmailValid = (newEmail, oldEmail) => {
    return (newEmail && newEmail !== oldEmail && newEmail.length >= 10) || 
      (newEmail == oldEmail);
  }

  const isPhoneValid = (newPhone, oldPhone) => {
    return (newPhone.length == 11 && !isNaN(newPhone)) || (newPhone == oldPhone)
  }

  const handlePassword = async (newPassword, oldPassword) => {
    if(newPassword == oldPassword) return;

    const data = new FormData();
    data.append('newPassword', newPassword);
    data.append('oldPassword', oldPassword);
    
    try {
      const response = await UserService.saveUserPassword(data ,userId);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleName = async (newName, oldName) => {
    if(newName == oldName) return;

    const data = new FormData();
    data.append('name', newName);
    
    try {
      const response = await UserService.saveUserName(data ,userId);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEmail = async (newEmail, oldEmail) => {
    if(newEmail == oldEmail) return;

    const data = new FormData();
    data.append('email', newEmail);
    
    try {
      const response = await UserService.saveUserEmail(data ,userId);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePhone = async (newPhone, oldPhone) => {
    if(newPhone == oldPhone) return;

    const data = new FormData();
    data.append('phone', newPhone);
    
    try {
      const response = await UserService.saveUserPhone(data ,userId);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={wrapper}>
      <div style={pageTitleText}>
        Настройки
        <Hr/>
      </div>
      
      <div style={form}>
        
        <div>
          Имя
        </div>
        <Input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          type='text'
          placeholder='Имя'
        />

        <div>
          Номер тел.
        </div>
        <Input
          value={newPhone}
          onChange={e => setNewPhone(e.target.value)}
          type='text'
          placeholder='Ваш номер тел.'
        />

        <div>
          Эл. Почта
        </div>
        <Input
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)}
          type='text'
          placeholder='Ваш E-mail'
        />

        

        <div>
          Старый пароль
        </div>
        <Input
          type='password'
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />

        <div>
          Новый пароль
        </div>
        <Input
          placeholder='8-20 символов'
          type='password'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />

        <div>
          Повторите пароль
        </div>
        <Input
          type='password'
          value={newRepeatPassword}
          onChange={e => setNewRepeatPassword(e.target.value)}
        />

        <Button onClick={handleSettings}>Изменить</Button>
      </div>
    </div>
  )
}

export default UserSettings
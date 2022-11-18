import React, {useState, useEffect,useCallback} from 'react'
import Hr from '../../components/ui/hr/Hr';
import { useNavigate, useParams } from 'react-router-dom';
import { pageTitleText, wrapper } from '../../utils/StyleUtil'
import Button from '../../components/ui/button/Button';
import Input from '../../components/ui/input/Input';
import { useAuth } from '../../components/hook/useAuth';
import UserService from '../../service/UserService';
import superImage from '../../utils/Image';
import { useDropzone } from 'react-dropzone';
import Image from '../../components/ui/img/Image';
import noAvatar from '../../images/no-avatar.png'
import { getFile } from '../../utils/FileUtil';
import { Link } from 'react-router-dom';

const UserSettings = () => {

  const id = useParams();
  const nav = useNavigate();
  const {store} = useAuth();
  const userId = store?.user?.id;
  const oldName = store?.user?.info?.name;
  const oldEmail = store?.user?.info?.email;
  const oldPhone = store?.user?.info?.phone;

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRepeatPassword, setNewRepeatPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  
  const avatarDelete = (image) =>  {
    setSelectedImage(null);
    URL.revokeObjectURL(image);
  }
  
  const onDrop = useCallback(acceptedFiles => {
    const Files = acceptedFiles;
    Files.map((file) => {
      setSelectedImage(
       new superImage(file,URL.createObjectURL(file))
      );
    })
    setIsChanged(true);
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const [passwordMessage, setPasswordMessage] = useState(false);
  const [nameMessage, setNameMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false)
  const [isValid, setIsValid] = useState(true);

  const form = {
    textAlign: 'center',
    alignItems: 'center',
    padding: '50px 10px',
    width: '1000px',
    height: 'auto',
    boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)',
  }

  const handleCheck = () => {
    if(!store.isAuth && userId !== id){
      nav('/');
    }
    setFile()
  }

  const setFile = async () => {
    const file = await getFile(store?.user?.image)
    setSelectedImage(file);
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
      handleImage(selectedImage)
    }
  }

  const handleImage = async (image) => {
    if (image == null) {
      await handleDeleteImage();
      return;
    }

    if(!isChanged) return; 

    const data = new FormData()
    data.append('file', image.file);

    try {
      const response = await UserService.saveAvatar(data,userId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  }

  const handleDeleteImage = async () => {
    try {
      const response = await UserService.deleteAvatar(userId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const isNameValid = (newName, oldName) => {
    return (newName == '') || (newName !== oldName && newName.length >=5 && newName.length <= 30)
  }

  const isPasswordValid = (newPassword, newRepeatPassword, oldPassword) => {
    return (newPassword.length >= 8 && newPassword.length <= 20 &&
      newPassword == newRepeatPassword && newPassword !== oldPassword && oldPassword != '') || 
      (oldPassword == '' && newPassword == '' && newRepeatPassword == '')
  }

  const isEmailValid = (newEmail, oldEmail) => {
    return (newEmail == '') || (newEmail !== oldEmail && newEmail.length >= 8 && newEmail.length <= 30)
  }

  const isPhoneValid = (newPhone, oldPhone) => {
    return (newPhone == '') || (newPhone !== oldPhone && newPhone.length == 11)
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
    window.location.reload();
  }

  const handleName = async (newName, oldName) => {
    if(newName == oldName || newName == '') return;

    const data = new FormData();
    data.append('name', newName);
    
    try {
      const response = await UserService.saveUserName(data ,userId);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  }

  const handleEmail = async (newEmail, oldEmail) => {
    if(newEmail == oldEmail || newEmail == '') return;

    const data = new FormData();
    data.append('email', newEmail);
    
    try {
      const response = await UserService.saveUserEmail(data ,userId);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  }
 
  const handlePhone = async (newPhone, oldPhone) => {
    if(newPhone == oldPhone || newPhone == '') return;

    const data = new FormData();
    data.append('phone', newPhone);
    
    try {
      const response = await UserService.saveUserPhone(data ,userId);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  }

  return (
    <div style={wrapper}>
      <div style={pageTitleText}>
        Настройки
        <Hr/>
      </div>
      
      <div style={form}>

      <div style={{display: 'flex', gap: '5rem', justifyContent: 'center', marginBottom: '50px'}}>

        <div style={{
        }}>
          
          <div style={{
            marginBottom: '50px'
          }}>
          
          <div style={{
            marginBottom: '30px'
          }}>
            <div>
              Имя
            </div>
            <Input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              type='text'
              placeholder={oldName}
            />
          </div>

          <div style={{
            marginBottom: '30px'
          }}>
            <div>
              Номер тел.
            </div>
            <Input
              value={newPhone}
              onChange={e => setNewPhone(e.target.value)}
              type='number'
              placeholder={oldPhone}
            />
          </div>

          <div style={{
            marginBottom: '30px'
          }}>
            <div>
              Эл. Почта
            </div>
            <Input
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              type='text'
              placeholder={oldEmail}
            />
          </div>

          </div>
        
        <div style={{
          marginBottom: '30px'
        }}>
          <div>
            Старый пароль
          </div>
          <Input
            type='password'
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder={'Ваш текущий пароль'}
            />
        </div>

        <div style={{
            marginBottom: '30px'
        }}>
          <div>
            Новый пароль
          </div>
          <Input
            placeholder='8-20 символов'
            type='password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            />
        </div>

        <div style={{
            marginBottom: '30px'
        }}>
          <div>
            Повторите пароль
          </div>
          <Input
            type='password'
            value={newRepeatPassword}
            onChange={e => setNewRepeatPassword(e.target.value)}
          />
        </div>

        </div>

      <div style={{width: '400px'}}>

        <div>
          {selectedImage ?
            <div>
              <div style={{display: 'inline-block'}}>
                
                <div style={{
                  display: 'inline-block',
                  border: '2px solid black',
                  marginBottom: '10px'
                }}>
                  <Image src={selectedImage.url} height='200' width='300' alt='img'/>
                </div>

                <div style={{
                  verticalAlign: 'top', display: 'inline-block'
                }}>
                  <Button onClick={() => avatarDelete(selectedImage)}> X </Button>
                </div>
              </div>
            </div>
            :
            <div style={{
              display: 'inline-block',
              border: '2px solid black'
            }}>
              <Image src={noAvatar} height='200' alt='img'/>
            </div>
          }
        </div>

        <div style={{marginBottom: '50px'}} {...getRootProps()}>
          <input {...getInputProps()}/>
          <div style={{border: '2px solid black', padding: '10px'}}>
          {
            isDragActive ?
              <div style={{fontSize: '15px'}}>Перетащите файлы сюда ...</div> :
              <div style={{textAlign: 'justify', fontSize: '15px'}}>
                Нажмите или перетащите для загрузки изображения
              </div>
          }
            </div>
        </div>

        <div style={{
          border: '2px solid black', padding: '10px',
        }}>
          <div style={{
            marginBottom: '10px'
          }}>
            Забыли пароль?
          </div>

          <div>
            <Button>
              <Link
              style={{textDecoration: 'none', color: 'white'}}
              to='/restore'
              >Восстановить пароль</Link>
            </Button>
          </div>
        </div>  

      </div>

      </div>        
          
      <div>

      </div>


        <Button onClick={handleSettings}>Сохранить</Button>
      </div>
    </div>
  )
}

export default UserSettings
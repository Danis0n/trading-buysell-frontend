import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from '../../components/ui/img/Image';
import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/input/Input';
import Select from '../../components/ui/select/Select';
import Textarea from '../../components/ui/textarea/Textarea';
import AdvertService from '../../service/AdvertService';
import cl from '../../styles/advert/CreateAdvert.module.css'
import Hr from '../../components/ui/hr/Hr';
import { useAuth } from '../../components/hook/useAuth';
import LoginForm from '../../components/ui/login/LoginForm';
import Modal from '../../components/ui/modal/Modal';


const CreateAdvert = ({isAuth}) => {

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesToRender, setImagesToRender] = useState([]);
  const [loginModal, setLoginModal] = useState(false)

  const [isAllowed, setIsAllowed] = useState(true);
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('none')

  const {store} = useAuth();

  const deleteHandler = (image, index) =>  {
    setSelectedImages(selectedImages.filter((_,index) => index !== 0));
    setImagesToRender(imagesToRender.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const handleLogin = (e) => {
    setLoginModal(false);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      if(!store.isAuth){
          setLoginModal(true);
      }

      if(inputCheck()){
        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('price', price);
        
        selectedImages.map(file => {
          return formData.append('files',file);
        })
        formData.append('type',type);
        
        try {
          const response = await AdvertService.create(formData);
        } catch (error) {
          console.log(error);
        }
      }
  }

  const onDrop = useCallback(acceptedFiles => {
    const Files = acceptedFiles;

    setSelectedImages((previousImages) => previousImages.concat(Files));

    const imagesArray = Files.map((file) => {
      return URL.createObjectURL(file);
    });
    setImagesToRender((previousImages) => previousImages.concat(imagesArray));
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const inputCheck = () => {

    if( title !== '' && description !== '' && ( !isNaN(price)) && location !== '' && type !== 'none') {
      if(location.length < 100 && description.length < 5000 && title.length < 50 && 
         price >= 50 && price <= 10000000 &&
         imagesToRender.length <= 10 && imagesToRender.length >= 1){
        setIsAllowed(true);
        return true;
      }
    }
    
    setIsAllowed(false);
    return false;
  }

  const style = {
    width: '350px'
  }

  return (
    <div style={{
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
     }}
    >
    <div style={{maxWidth: '600px'}}>
      <div className={cl.titleWord}>
        Опубликовать объявление
        <Hr/>
      </div>

      <div className={cl.advertWrapper}>
        <div className={cl.itemTitle}>
          Категория *
        </div>
        <div className={cl.itemField}>
          <Select style={style} value={type} onChange={(e) => setType(e.target.value)}>
            <option disabled defaultValue value='none'>Выберете категорию</option>
            <option value='job'>Работа</option>
            <option value='auto'>Авто</option>
            <option value='animal'>Животные</option>
          </Select>
        </div>

        <div className={cl.itemTitle}>
          Название *
        </div>
        <div className={cl.itemField}>
          <Input 
            style={style}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='не более 50 символов'
          />
        </div>

        <div className={cl.itemTitle}>
          Описание *
        </div>
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={5}
          cols={50}
          name='text'
          placeholder='не более 5000 символов'
        />
        
        <div className={cl.itemTitle}>
          Добавить изображения *
        </div>

        {imagesToRender.length < 10
        ?
          <div className={cl.itemFileArea} {...getRootProps()}>
            <input {...getInputProps()}/>
            {
              isDragActive ?
                <p>Перетащите файлы сюда ...</p> :
                <p style={{textAlign: 'justify'}}>
                  Нажмите или перетащите для загрузки изображений. Не более 10 изображений
                </p>
            }
          </div>
        :
          <></>
        }


        <div>
          {imagesToRender && imagesToRender.map((image,index) => {
            return (
              <div key={image} className={cl.imagePreviewArea}>
                <button className={cl.previewButton} onClick={() => deleteHandler(image,index)}>Удалить</button>
                <Image src={image} height='100' alt='img'/>
              </div>
            )
          })}
        </div>


        <div className={cl.itemTitle}>
          Цена *
        </div>
        <div className={cl.itemField}>
          <Input 
          style={style}
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder='50 - 10.000.000'
          />
        </div>

        <div className={cl.itemTitle}>
          Адрес *
        </div>
        <div className={cl.itemField}>
          <Input 
          style={style}
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder='не более 100 символов'
          />
        </div>

        {!isAllowed
        ?
        <div
         style={{
          marginBottom: '40px',
          color: 'red',
         }}
        >
          <Hr/>
          Пожалуйста, заполните все поля корректно!
        </div>
        :
        <div></div>
        }
        
        <div className={cl.itemButton}>
          <Button onClick={handleSubmit}>Опубликовать</Button>
        </div>

        <Modal
          visible={loginModal}
          setVisible={setLoginModal}
        >
          <LoginForm handleLogin={handleLogin}/>
        </Modal>

        </div>
      </div>
    </div>
  );
}

export default CreateAdvert;
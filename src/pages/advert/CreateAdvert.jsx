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
import superImage from '../../utils/Image';
import { useNavigate } from 'react-router-dom';
import SmartInput from './SmartInput';
import SmartSelect from './SmartSelect';


const CreateAdvert = ({isAuth}) => {

  const nav = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);
  const [loginModal, setLoginModal] = useState(false)

  const [DBLocations, setDBLocations] = useState([])
  const [titleType, setTitleType] = useState('');
  const [brandTypes, setBrandTypes] = useState([]);
  const [mainTypes, setMainTypes] = useState([]);
  const [subTypes, setSubTypes] = useState([]);

  const [main, setMain] = useState('');
  const [sub, setSub] = useState('');
  const [brand, setBrand] = useState('');

  const [isAllowed, setIsAllowed] = useState(true);
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState()

  const {store} = useAuth();

  const imageDeleteHandler = (image, index) =>  {
    setSelectedImages(selectedImages.filter((e) => e !== image));
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
        formData.append('mainType',main);
        formData.append('brandType',brand);
        formData.append('titleType',titleType);
        formData.append('subType',sub);
        
        selectedImages.map(file => {
          return formData.append('files',file.file);
        })


        let response
        try {
          response = await AdvertService.create(formData);
          console.log(response);
        } catch (error) {
          console.log(error);
        } finally {
          if(response.status === 200 ) {
            nav(`/user/${store.user.id}/adverts`)
          }
        }
      }
  }

  const onDrop = useCallback(acceptedFiles => {
    const Files = acceptedFiles;
    Files.map((file) => {
      setSelectedImages(
        (previousImages) => previousImages.concat(new superImage(file,URL.createObjectURL(file)))
      );
    })
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const inputCheck = () => {

    if(title !== '' && description !== '' && ( !isNaN(price)) && location !== '' && titleType !== '') {
      if(location.length < 100 && description.length < 5000 && title.length < 50 && 
         price >= 50 && price <= 10000000 &&
         selectedImages.length <= 10 && selectedImages.length >= 1){
        setIsAllowed(true);
        return true;
      }
    }
    
    setIsAllowed(false);
    return false;
  }

  const getLocations = async () => {
    try {
      const response = await AdvertService.getLocations();
      setDBLocations(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBrand = async (titleType) => {
    try {
      const response = await AdvertService.getBrandTypeByTitleType(titleType);
      setBrandTypes(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMain = async (titleType) => {
      try {
        const response = await AdvertService.getMainTypeByTitleType(titleType);
        setMainTypes(response.data)
      } catch (error) {
        console.log(error);
      }
  }

  const fetchSub = async (titleType) => {
    try {
      const response = await AdvertService.getSubTypeByTitleType(titleType);
      setSubTypes(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLocations();
  }, [])

  useEffect(() => {
    fetchMain(titleType);
    fetchSub(titleType);
    fetchBrand(titleType);
    setMain('')
    setSub('')
    setBrand('')
  }, [titleType])
  
  const style = {
    width: '260px'
  }

  return (
    <div style={{
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
     }}
    >
    <div style={{maxWidth: '1000px', height: "1000px"}}>
      <div className={cl.titleWord}>
        Опубликовать объявление
        <Hr/>
      </div>

      <div style={{
        padding: '30px 60px',
        display: 'table',
        boxShadow: '0 0 15px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{display: 'flex', gap: "3rem"}}>
          <SmartInput
            styleInput={style}
            title={'Название *'}
            inputType={'text'}
            set={setTitle}
            value={title}
            placeholder={'не более 50 символов'}
          />
        <div style={{display: 'flex', gap: '2rem'}}>
          <div className={cl.itemTitle}>
            Категория *
          </div>
          <SmartSelect
            style={style}
            value={titleType}
            set={setTitleType}
            defaultValue={''}
            array={[
              {name: 'auto', description : 'Авто'},
              {name: 'tech', description : 'Электроника'},
              {name: 'study', description : 'Обучение'},
              {name: 'property', description : 'Недвижимость'},
            ]}
          />
        </div>
      </div>

      <div>
      {titleType !== '' ?
      <div style={{marginBottom: '50px'}}>
        <div style={{fontSize: '25px'}}>
          Подкатегории
        </div>
        <Hr/>

        <div style={{display: 'flex', gap: '2.1rem', marginBottom: '-40px'}}>
          <SmartSelect
            style={style}
            value={main}
            set={setMain}
            defaultValue={''}
            array={mainTypes}
            />
          <SmartSelect
            style={style}
            value={sub}
            set={setSub}
            defaultValue={''}
            array={subTypes}
          />
          <SmartSelect
            style={style}
            value={brand}
            set={setBrand}
            defaultValue={''}
            array={brandTypes}
          />
        </div>
        <Hr/>
      </div>
      :
      <></>
      }
      </div>

      <div style={{display: 'flex', gap: '5rem'}}>
        <SmartInput
          styleInput={style}
          title={'Цена *'}
          inputType={'number'}
          set={setPrice}
          value={price}
          placeholder={'50 - 10.000.000'}
        />
        <div style={{display : 'flex', gap: '4rem'}}>
          <div className={cl.itemTitle}>
            Адрес *
          </div>
          <div className={cl.itemField}>
            <SmartSelect
              style={style}
              value={location}
              set={setLocation}
              defaultValue={''}
              array={DBLocations}
            />
          </div>
        </div>
      </div>

      <div className={cl.itemTitle}>
        Описание *
      </div>
      <Textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={5}
        cols={80}
        name='text'
        placeholder='не более 5000 символов'
      />
        
        <div className={cl.itemTitle}>
          Добавить изображения *
        </div>

        {selectedImages.length < 10
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
          {selectedImages && selectedImages.map((image,index) => {
            return (
              <div key={index} className={cl.imagePreviewArea}>
                <button className={cl.previewButton} onClick={() => imageDeleteHandler(image,index)}>Удалить</button>
                <Image src={image.url} height='100' alt='img'/>
              </div>
            )
          })}
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
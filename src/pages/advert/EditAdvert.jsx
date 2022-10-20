import React, {useState, useCallback, useEffect} from 'react'
import AdvertService from '../../service/AdvertService';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { getFile } from '../../utils/FileUtil';
import cl from '../../styles/advert/CreateAdvert.module.css'
import Image from '../../components/ui/img/Image';
import Button from '../../components/ui/button/Button';
import Hr from '../../components/ui/hr/Hr';
import Textarea from '../../components/ui/textarea/Textarea';
import Input from '../../components/ui/input/Input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/hook/useAuth';
import Confirm from '../../components/ui/confirm/Confirm';
import Modal from '../../components/ui/modal/Modal';
import superImage from '../../utils/Image';


const EditAdvert = () => {

  const {id} = useParams();
  const {store} = useAuth();
  
  const [selectedImages, setSelectedImages] = useState([]);
  
  const [confirmModal, setConfirmModal] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [loading, setLoading] = useState();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();

  const sendResponse = async (id, formData) => {
    try {
      const response = await AdvertService.update(id,formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fillDataRequest = () => {
    const formData = new FormData();
    formData.append('title',title);
    formData.append('location',location);
    formData.append('description',description);
    formData.append('price',price);
    selectedImages.map(file => {
      return formData.append('files',file.file);
    })
    formData.append('type',type); 
    sendResponse(id, formData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmModal(false);

    if(inputCheck()){
      fillDataRequest()
      navigate(`/adverts/${id}`);
    }
  }

  const setStates = (advert) => {
    setTitle(advert?.title);
    setLocation(advert?.location);
    setDescription(advert?.description);
    setPrice(advert?.price);
    setType(advert?.type?.name);

    advert?.images.map(async (image) => {
      const file = await getFile(image);
      setSelectedImages((prevImage) => prevImage.concat(file));
    });

    return advert?.userId;
  }

  const onDrop = useCallback(acceptedFiles => {
    const Files = acceptedFiles;
    Files.map((file) => {
      setSelectedImages(
        (previousImages) => previousImages.concat(new superImage(file,URL.createObjectURL(file)))
      );
    })
  }, [])

  const deleteHandler = (image, index) =>  {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const fetchAdvert = async (id) => {
    setLoading(true)
    let userId;
    try {
      const response = await AdvertService.getId(id);
      userId = setStates(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
    return userId;
  }

  const handleCheck = async (userId) => {
    const id = store.user.id;
    const isAuth = store.isAuth;
  
    if(isAuth && id === userId) {

    } else {
      navigate('/');
    }
  }
  
  useEffect(() => {
    fetchAdvert(id).then(userId => {
      const timer = setTimeout(() => handleCheck(userId), 500);
      return () => clearTimeout(timer);
    });
  }, [])
  
  const inputCheck = () => {

    if( title !== '' && description !== '' && ( !isNaN(price)) && location !== '' && type !== 'none') {
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
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div style={{
      width: '700px',
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>

      <div className={cl.titleWord}>
        Редактировать объявление
        <Hr/>
      </div>

      <div className={cl.advertWrapper}>

        <div className={cl.itemTitle}>
          <div style={{display: 'flex'}}>
            Название <div style={{color: 'gray', marginLeft: '10px'}}>(не более 50 символов)</div>
          </div>
        </div>
        <div className={cl.itemField}>
          <Input
          style={{
            textAlign: 'left'
            }}
          type="text"
          onChange={e => setTitle(e.target.value)}
          placeholder={title}
          />
        </div>

        <div className={cl.itemTitle}>
          <div style={{display: 'flex'}}>
              Описание <div style={{color: 'gray', marginLeft: '10px'}}>(не более 5000 символов)</div>
          </div>
        </div>
        <div className={cl.itemField}>
          <Textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={5}
            cols={50}
            name='text'
            />
        </div>

        <div className={cl.itemTitle}>
          <div style={{display: 'flex'}}>
                Цена <div style={{color: 'gray', marginLeft: '10px'}}>(50 - 10.000.000 руб.)</div>
          </div>
        </div>
        <div className={cl.itemField}>
          <Input 
          type="text"
          onChange={e => setPrice(e.target.value)}
          placeholder={price}
          />
        </div>

        <div className={cl.itemTitle}>
          <div style={{display: 'flex'}}>
              Адрес <div style={{color: 'gray', marginLeft: '10px'}}>(не более 100 символов)</div>
          </div>
        </div>
        <div className={cl.itemField}>
          <Input 
          type="text"
          onChange={e => setLocation(e.target.value)}
          placeholder={location}
          />
        </div>

        {selectedImages.length < 10
        ?
          <div className={cl.itemFileArea} {...getRootProps()}>
            <input {...getInputProps()}/>
            {
              isDragActive ?
                <p>Перетащите файлы сюда ...</p> :
                <p style={{textAlign: 'justify'}}>
                  Нажмите или перетащите для загрузки изображений.
                  <div style={{color: 'gray'}}>(Не более 10 изображений.)</div>
                </p>
            }
          </div>
        :
          <></>
        }

        <div className={cl.itemTitle}>
          {selectedImages && selectedImages.map((image,index) => {
            return (
              <div key={index} className={cl.imagePreviewArea}>
                <button className={cl.previewButton} onClick={() => deleteHandler(image,index)}>Удалить</button>
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
        <></>
        }

        <div className={cl.itemButton}>
          <Button onClick={() => setConfirmModal(true)}>Изменить</Button>
        </div>

        <Modal
          visible={confirmModal}
          setVisible={setConfirmModal}
        >
          <Confirm
           handleCancel={() => setConfirmModal(false)}
           handleItem={handleSubmit}
           link={`/adverts/${id}`}
           message='Вы уверены в следующих изменениях?'/>
        </Modal>

      </div>
    </div>
  )
}

export default EditAdvert
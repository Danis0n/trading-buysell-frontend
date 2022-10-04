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

const EditAdvert = () => {

  const {id} = useParams();
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesToRender, setImagesToRender] = useState([]);
    
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')

  const sendResponse = async (id, formData) => {
    try {
      const response = await AdvertService.update(id,formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title',title);
    formData.append('location',location);
    formData.append('description',description);
    formData.append('price',price);
    selectedImages.map(file => {
      return formData.append('files',file);
    })
    formData.append('type',type);
    
    sendResponse(id, formData);
  }

  async function setStates(advert){
    setTitle(advert?.title);
    setLocation(advert?.location);
    setDescription(advert?.description);
    setPrice(advert?.price);
    setType(advert?.type?.name);

    advert?.images.map(async (image) => {
      const file = await getFile(image);
      setSelectedImages((prevImage) => prevImage.concat(file));
    });

    advert?.images.map((image) => {
      return setImagesToRender((prevImage) => prevImage.concat(image.url));
    });
  }

  const onDrop = useCallback(acceptedFiles => {
    const Files = acceptedFiles;
    setSelectedImages((previousImages) => previousImages.concat(Files));

    const imagesArray = Files.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagesToRender((previousImages) => previousImages.concat(imagesArray));
  }, [])

  const deleteHandler = (image, index) =>  {
    setSelectedImages(selectedImages.filter((_,index) => index !== 0));
    setImagesToRender(imagesToRender.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const fetchAdvert = async (id) => {
    const response = await AdvertService.getId(id);
    const data = response.data;
    setStates(data);
  }

  useEffect(() => {
    fetchAdvert(id);
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div>

      <div className={cl.titleWord}>
        Редактировать объявление
        <Hr/>
      </div>

      <div className={cl.advertWrapper}>

        <div className={cl.itemTitle}>
         Название
        </div>
        <Input
         type="text"
         onChange={e => setTitle(e.target.value)}
         placeholder={title}
        />

        <div className={cl.itemTitle}>
          Описание
        </div>
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={5}
          cols={50}
          name='text'
        />

        <div className={cl.itemTitle}>
          Цена
        </div>
        <div className={cl.itemField}>
          <Input 
          type="text"
          onChange={e => setPrice(e.target.value)}
          placeholder={price}
          />
        </div>

        <div className={cl.itemTitle}>
          Адрес
        </div>
        <div className={cl.itemField}>
          <Input 
          type="text"
          onChange={e => setLocation(e.target.value)}
          placeholder={location}
          />
        </div>

        <div className={cl.itemTitle}>
          Добавить/Удалить изображения
        </div>
        <div className={cl.itemFileArea} {...getRootProps()}>
          <input {...getInputProps()}/>
          {
            isDragActive ?
            <p>Перетащите файлы сюда ...</p> :
            <p>Нажмите или перетащите для загрузки изображений</p>
            }
        </div>

        <div className={cl.itemTitle}>
          {imagesToRender && imagesToRender.map((image,index) => {
            return (
              <div key={image} className={cl.imagePreviewArea}>
                <button className={cl.previewButton} onClick={() => deleteHandler(image,index)}>Удалить</button>
                <Image src={image} height='100' alt='img'/>
              </div>
            )
          })}
        </div>

        <div className={cl.itemButton}>
          <Button onClick={handleSubmit}>Изменить</Button>
        </div>



      </div>
    </div>
  )
}

export default EditAdvert
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from '../../components/ui/img/Image';
import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/input/Input';
import Select from '../../components/ui/select/Select';
import Textarea from '../../components/ui/textarea/Textarea';
import AdvertService from '../../service/AdvertService';
import cl from '../../styles/advert/CreateAdvert.module.css'
import Hr from '../../components/ui/hr/Hr';


const CreateAdvert = () => {

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesToRender, setImagesToRender] = useState([]);

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('none')
 
  const deleteHandler = (image, index) =>  {
    setSelectedImages(selectedImages.filter((_,index) => index !== 0));
    setImagesToRender(imagesToRender.filter((e) => e !== image));
    URL.revokeObjectURL(image);
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
      
      try {
        const response = await AdvertService.create(formData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
  }

  const onDrop = useCallback(acceptedFiles => {
    const Files = acceptedFiles;
    setSelectedImages(...selectedImages,Files);

    const imagesArray = Files.map((file) => {
      return URL.createObjectURL(file);
    });
    setImagesToRender((previousImages) => previousImages.concat(imagesArray));
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div>

      <div className={cl.titleWord}>
        Опубликовать объявление
        <Hr/>
      </div>

      <div className={cl.advertWrapper}>

      <div className={cl.itemTitle}>
        Категория *
      </div>
      <div className={cl.itemField}>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
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
         type="text"
         value={title}
         onChange={e => setTitle(e.target.value)}
         placeholder=''
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
      />
      
      <div className={cl.itemTitle}>
        Добавить изображения *
      </div>
      <div className={cl.itemFileArea} {...getRootProps()}>
        <input {...getInputProps()}/>
        {
          isDragActive ?
            <p>Перетащите файлы сюда ...</p> :
            <p>Нажмите или перетащите для загрузки изображений</p>
        }
      </div>

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
         type="text"
         value={price}
         onChange={e => setPrice(e.target.value)}
         placeholder=''
        />
      </div>

      <div className={cl.itemTitle}>
        Адрес *
      </div>
      <div className={cl.itemField}>
        <Input 
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder=''
        />
      </div>
      
      <div className={cl.itemButton}>
        <Button onClick={handleSubmit}>Опубликовать</Button>
      </div>

      </div>
    </div>
  );
}

export default CreateAdvert;
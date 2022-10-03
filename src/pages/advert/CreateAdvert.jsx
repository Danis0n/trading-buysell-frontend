import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Input from '../../components/ui/input/Input';
import Select from '../../components/ui/select/Select';
import Textarea from '../../components/ui/textarea/Textarea';
import AdvertService from '../../service/AdvertService';
import cl from '../../styles/advert/CreateAdvert.module.css'

const CreateAdvert = () => {

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesToRender, setImagesToRender] = useState([]);

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
 
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
    <div className={cl.advertWrapper}>

      {/* TODO : implement choice */}
      <div className={cl.itemTitle}>
        Категория *
      </div>
      <div className={cl.itemField}>
        <Select>
          <option disabled selected>Выберете категорию</option>
          <option>Работа</option>
          <option>Авто</option>
          <option>Животные</option>
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
         rows={5}
         cols={44}
         name='text'
      />

      <div className={cl.itemTitle}>
        Добавить изображения *
      </div>
      <div className={cl.itemFileArea} {...getRootProps()}>
            <input {...getInputProps()}/>
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Нажмите или перетащите для загрузки изображений</p>
            }
      </div>

      <div>
        {imagesToRender && imagesToRender.map((image,index) => {
          return (
            <div key={image}>
              <img src={image} height='200' alt='img'/>
              <button onClick={() => deleteHandler(image,index)}>delete image</button>
              <p>{index + 1}</p>
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
         value={title}
         onChange={e => setTitle(e.target.value)}
         placeholder=''
        />
      </div>


      
      
      <div>
        <label>
          <button onClick={handleSubmit}>submit</button>
          <br />
        </label>
      </div>

    </div>
  );
}

export default CreateAdvert;
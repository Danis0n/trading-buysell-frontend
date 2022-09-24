import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import $api from '../components/http';
import AdvertService from '../service/AdvertService';
import { API_URL } from '../components/http';

const CreateAdvert = () => {

  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState('test')
  const [location, setLocation] = useState('test')
  const [description, setDescription] = useState('test')
  const [price, setPrice] = useState('test')
  const [type, setType] = useState('job')

  const [isLoading, setIsLoading] = useState(false)

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;

    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };
 
  const deleteHandler = (image) =>  {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('title',title);
      formData.append('location',location);
      formData.append('description',description);
      formData.append('price',price);
      
      // сделать на бэке стрингой файл
      selectedImages.map(file => {
          formData.append('files',file);
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
    setIsLoading(true);
    const Files = acceptedFiles;
    setSelectedImages(...selectedImages,Files);
    setIsLoading(false)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  console.log(selectedImages);

  if(isLoading){
    return <div>Loading</div>
  }

    return (
      <section>
        <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
        </div>

        <div>
          <label>
            Title
            <br />
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='title'
            />
          </label>
        </div>

        <div>
          <label>
            location
            <br />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder='location'
            />
          </label>
        </div>
        <div>
          <label>
            description
            <br />
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder='description'
            />
          </label>
        </div>
        <div>
          <label>
            price
            <br />
            <input
              type="text"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder='price'
            />
          </label>
        </div>
        <div>
          <label>
            type
            <br />
            <input
              type="text"
              value={type}
              onChange={e => setType(e.target.value)}
              placeholder='type'
            />
          </label>
        </div>
        <div>
          <label>
            <button onClick={handleSubmit}>submit</button>
            <br />
          </label>
        </div>

      </section>
    );
}

export default CreateAdvert;
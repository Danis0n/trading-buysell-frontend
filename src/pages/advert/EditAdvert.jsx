import React, {useState, useCallback, useEffect} from 'react'
import AdvertService from '../../service/AdvertService';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { getFile } from '../../utils/FileUtil';

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

      <div {...getRootProps()}>
            <input {...getInputProps()}/>
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
      </div>

      <div>
        {imagesToRender && imagesToRender.map((image, index) => {
          return (
            <div key={image}>
              <img src={image} height='200' alt='img'/>
              <button onClick={() => deleteHandler(image,index)}>delete image</button>
              <p>{index + 1}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EditAdvert
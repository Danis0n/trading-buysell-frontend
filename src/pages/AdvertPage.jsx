import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { API_URL } from '../components/http'
import { useParams } from 'react-router-dom'
import WSPGallery from '../components/WSPGallery'

const AdvertPage = () => {

    const [advert, setAdvert] = useState();
    const [images, setImages] = useState();
    const {id} = useParams();
    
    async function fetchData() {
        const response = await axios.get(`${API_URL}/api/advert/get/${id}`)
        setAdvert(response.data);
        setImages(response.data.images)
    }

    useEffect(() =>  {
        fetchData();
    }, [])

    return (
        <div>
            {advert?.id} {advert?.title} {advert?.type.name}
            <WSPGallery
             galleryImages={advert?.images}
            />
        </div>
    )
}

export default AdvertPage
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AdvertService from '../service/AdvertService'
import { API_URL } from '../components/http'
import { useParams } from 'react-router-dom'
import Gallery from '../components/Gallery'

const AdvertPage = () => {

    const [advert, setAdvert] = useState();
    const {id} = useParams();
    
    async function fetchData() {
        try {
            const response = await AdvertService.getId(id);
            setAdvert(response.data);
        } catch (error) {
            console.log(error.message);            
        }
    }

    useEffect(() =>  {
        fetchData();
    }, [])

    return (
        <div>
            <div>
                {advert?.id}
            </div>
            <div>
                {advert?.title}
            </div>
            <div>
                {advert?.description}
            </div>
            <div>
                {advert?.location}
            </div>
            <div>
                {advert?.type.name}
            </div>
            <div>
                {advert?.location}
            </div>
            <div>
                {advert?.price}
            </div>
            <div>
                {advert?.userId}
            </div>
            <div>
                {advert?.dateOfCreation}
            </div>

            <Gallery
             galleryImages={advert?.images}
            />

        </div>
    )
}

export default AdvertPage
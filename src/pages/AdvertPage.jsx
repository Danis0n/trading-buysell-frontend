import React, {useState, useEffect} from 'react'
import AdvertService from '../service/AdvertService'
import { useParams } from 'react-router-dom'
import Gallery from '../components/Gallery'
import { Link } from 'react-router-dom'

const AdvertPage = () => {

    const [advert, setAdvert] = useState();
    const {id} = useParams();

    async function handleDelete() {
        try {
            const response = await AdvertService.delete(id);
            console.log(response);
        } catch (error) {
            console.log(error);            
        }
    }

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

            <Link to='edit'>Edit</Link>
            <button onClick={handleDelete}>Delete</button>

        </div>
    )
}

export default AdvertPage;
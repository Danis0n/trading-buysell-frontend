import React, {useState, useEffect} from 'react'
import AdvertService from '../service/AdvertService';
import AdvertElement from './AdvertElement';

const AdvertsPage = () => {

    const [adverts, setAdverts] = useState([])
    
    async function fetchData() {
        try {
            const response = await AdvertService.getAll();
            setAdverts(response.data);
        } catch (error) {
            console.log(error.message);            
        }   
    }

    useEffect(() =>  {
        fetchData();
    }, [])

    return (
        <div>
            {adverts.map((a) => (
               <AdvertElement key={a.id} a={a}/> 
            ))}
        </div>
    )
}

export default AdvertsPage
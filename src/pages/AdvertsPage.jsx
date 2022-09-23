import React, {useState, useEffect} from 'react'
import { Advert } from '../model/Advert'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { API_URL } from '../components/http';
import AdvertElement from './AdvertElement';

const AdvertsPage = () => {

    const [adverts, setAdverts] = useState([])
    
    useEffect(() =>  {
        async function fetchData() {
            const response = await axios.get(`${API_URL}/api/advert/get/all`)
            setAdverts(response.data);
            console.log(response);
        }
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
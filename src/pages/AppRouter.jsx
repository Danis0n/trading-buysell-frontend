import React from 'react';
import {Routes, Route} from "react-router-dom";
import { useAuth } from '../components/hook/useAuth';
import Layout from '../components/layouts/Layout';
import HomePage from './HomePage';
import AdvertsPage from './AdvertsPage';
import AdvertPage from './AdvertPage';
import CreateAdvert from './CreateAdvert';

const AppRouter = () => {
    const {store} = useAuth()

    if(store.isLoading){
        return <div>Loading</div>
    }
    
    return (
        <Routes>
            <Route path='/' element={<Layout isAuth={store.isAuth}/>}>
                <Route index element={<HomePage/>}/>
                <Route path='adverts' element={<AdvertsPage/>}/>
                <Route path='adverts/:id' element={<AdvertPage/>}/>
                <Route path='adverts/create' element={<CreateAdvert/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;

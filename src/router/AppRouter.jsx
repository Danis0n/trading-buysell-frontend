import React from 'react';
import {Routes, Route} from "react-router-dom";
import { useAuth } from '../components/hook/useAuth';
import Layout from '../components/layouts/Layout';
import HomePage from '../pages/HomePage';
import AdvertsPage from '../pages/AdvertsPage';
import AdvertPage from '../pages/AdvertPage';
import CreateAdvert from '../pages/CreateAdvert';
import EditAdvert from '../pages/EditAdvert';

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
                <Route path='adverts/:id/edit' element={<EditAdvert/>}/>
                <Route path='adverts/create' element={<CreateAdvert/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;
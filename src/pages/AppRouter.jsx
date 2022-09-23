import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
// import { Context } from '..';
import NoAuthorizedNavbar from '../components/ui/navbar/NoAuthorizedNavbar';
import AuthorizedNavbar from '../components/ui/navbar/AuthorizedNavbar';
import { useAuth } from '../components/hook/useAuth';
import Layout from '../components/layouts/Layout';
import HomePage from './HomePage';
import AdvertsPage from './AdvertsPage';
import AdvertPage from './AdvertPage';

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
            </Route>
        </Routes>

    );
};

export default AppRouter;

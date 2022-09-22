import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
// import { Context } from '..';
import NoAuthorizedNavbar from '../components/ui/navbar/NoAuthorizedNavbar';
import AuthorizedNavbar from '../components/ui/navbar/AuthorizedNavbar';
import { useAuth } from '../hook/useAuth';

const AppRouter = () => {
    const {store} = useAuth()

    if (store.isLoading) {
        // return <Loader/>
    }

    return (
        store.isAuth
        ?
        <AuthorizedNavbar/>
        :
        <NoAuthorizedNavbar/>
    );
};

export default AppRouter;

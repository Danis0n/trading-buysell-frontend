import {Routes, Route , useLocation} from "react-router-dom";
import { useAuth } from '../components/hook/useAuth';
import Layout from '../components/layouts/Layout';
import HomePage from '../pages/HomePage';
import AdvertsPage from '../pages/advert/AdvertsPage';
import AdvertPage from '../pages/advert/AdvertPage';
import CreateAdvert from '../pages/advert/mngt/CreateAdvert';
import EditAdvert from '../pages/advert/mngt/EditAdvert';
import RegisterUser from '../pages/registration/RegisterUser';
import UserPage from '../pages/user/UserPage';
import AboutPage from "../pages/service/AboutPage";
import NotFoundPage from "../pages/service/NotFoundPage";
import {AnimatePresence} from 'framer-motion'
import UserSettings from "../pages/user/UserSettings";
import ForbiddenPage from "../pages/service/ForbiddenPage";
import UserAdverts from "../pages/user/UserAdverts";
import AdminPanel from "../pages/admin/AdminPanel";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toJS } from "mobx";
import NotificationPage from "../pages/notify/NotificationPage";
import PasswordRestore from "../pages/password/PasswordRestore";
import PasswordUpdate from "../pages/password/PasswordUpdate";
import BadToken from "../pages/password/BadToken";
import MailSend from "../pages/password/MailSend";
import PasswordUpdateSuccess from "../pages/password/PasswordUpdateSuccess";
import UserAdvetsAdmin from "../pages/admin/users/UserAdvetsAdmin";
import RegistrationEmailConfirm from "../pages/registration/RegistrationEmailConfirm";
import RegisterSuccess from "../pages/registration/RegisterSuccess";
import RegisterBadToken from "../pages/registration/RegisterBadToken";

const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/*',
    children
}) => {
    console.log(isAllowed);
    if (!isAllowed)
      return <Navigate to={redirectPath} replace />;
    return children ? children : <Outlet />;
};

const AppRouter = () => {
    const {store} = useAuth()
    const location = useLocation();

    if(store.isLoading){
        return <div>Loading</div>
    }

    return (
        <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Layout isAuth={store.isAuth} />}>
                <Route index element={<HomePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='forbidden' element={<ForbiddenPage/>}/>
                <Route path='adverts' element={<AdvertsPage/>}/>
                <Route path='advert/:id' element={<AdvertPage/>}/>
                <Route path='advert/:id/edit' element={<EditAdvert/>}/>
                <Route path='advert/create' element={<CreateAdvert/>}/>
                <Route path='register' element={<RegisterUser/>}/>
                <Route path='register/confirm' element={<RegistrationEmailConfirm/>}/>
                <Route path='register/token/badtoken' element={<RegisterBadToken/>}/>
                <Route path='register/success' element={<RegisterSuccess/>}/>
                <Route path='user/:id' element={<UserPage/>}/>
                <Route path='user/:id/adverts' element={<UserAdverts/>}/>
                <Route path='user/:id/settings' element={<UserSettings/>}/>
                <Route path='about' element={<AboutPage/>}/>
                <Route path='admin' element={<AdminPanel/>}/>
                <Route path='admin/user/adverts' element={<UserAdvetsAdmin/>}/>
                <Route path='notifications' element={<NotificationPage/>}/>
                <Route path='restore' element={<PasswordRestore/>}/>
                <Route path='restore/success' element={<MailSend/>}/>
                <Route path='password/update' element={<PasswordUpdate/>}/>
                <Route path='password/update/success' element={<PasswordUpdateSuccess/>}/>
                <Route path='password/restore/badtoken' element={<BadToken/>}/>
            </Route>
        </Routes>
    </AnimatePresence>
    );
};

export default AppRouter;

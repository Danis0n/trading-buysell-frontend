import {Routes, Route} from "react-router-dom";
import { useAuth } from '../components/hook/useAuth';
import Layout from '../components/layouts/Layout';
import HomePage from '../pages/HomePage';
import AdvertsPage from '../pages/advert/AdvertsPage';
import AdvertPage from '../pages/advert/AdvertPage';
import CreateAdvert from '../pages/advert/CreateAdvert';
import EditAdvert from '../pages/advert/EditAdvert';
import RegisterUser from '../pages/user/registration/RegisterUser';
import UserPage from '../pages/user/UserPage';
import AboutPage from "../pages/AboutPage";

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
                <Route path='register' element={<RegisterUser/>}/>
                <Route path='user/:id' element={<UserPage/>}/>
                <Route path='about' element={<AboutPage/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;

import $api from '../components/http';
import {AxiosResponse} from 'axios'
import { AuthResponse } from '../response/AuthResponse';

export default class AuthService {
    
    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/api/login',{username, password})
    }

    // TODO : implement on server-side
    static async registration(username: string, name: string,
        password: string, email: string, phone: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/api/register',{username, name, password,email,phone})
    }
    
    static async logout(): Promise<void> {
        return $api.post('/api/logout')
    }

    

}

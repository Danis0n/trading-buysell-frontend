import $api, { API_URL } from '../components/http';
import axios, {AxiosResponse} from 'axios'
import { AuthResponse } from '../response/AuthResponse';

export default class AuthService {
    
    static async register(data: FormData) : Promise<AxiosResponse<any>> {
        return axios.post(`${API_URL}/api/register`,data);
    }

    static async updateToken() : Promise<AxiosResponse<any>> {
        return $api.get(`${API_URL}/api/new/token`);
    } 

    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/api/login',{username, password});
    }

    static async checkAuth() : Promise<AxiosResponse<AuthResponse>> {
        return axios.get(`${API_URL}/api/auth`, {withCredentials: true});
    }
    
    static async logout(): Promise<void> {
        return $api.post('/api/logout');
    }

}

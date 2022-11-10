import $api, { API_URL } from '../components/http';
import axios, {AxiosResponse} from 'axios'
import { User } from '../model/User';

export default class UserService {

    static async fetchUsers() : Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>('api/users/get/all');
    }

    static async fetchUser(id: string) : Promise<AxiosResponse<User>> {
        return axios.get<User>(`${API_URL}/api/users/get/${id}`);
    }

    static async saveUserPassword(data: FormData, id: string) : Promise<AxiosResponse<string>> {
        return $api.put<string>(`${API_URL}/api/users/${id}/password/save`,data);
    }

    static async saveUserName(data: FormData, id: string) : Promise<AxiosResponse<string>> {
        return $api.put<string>(`${API_URL}/api/users/${id}/name/save`,data);
    }

    static async saveUserEmail(data: FormData, id: string) : Promise<AxiosResponse<string>> {
        return $api.put<string>(`${API_URL}/api/users/${id}/email/save`,data);
    }

    static async saveUserPhone(data: FormData, id: string) : Promise<AxiosResponse<string>> {
        return $api.put<string>(`${API_URL}/api/users/${id}/phone/save`,data);
    }
    
}
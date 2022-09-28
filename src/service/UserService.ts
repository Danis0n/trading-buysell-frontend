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
    
}
import $api from '../components/http';
import {AxiosResponse} from 'axios'
import { User } from '../model/User';

export default class UserService {
    static fetchUsers() : Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>('api/users')
    }  
}
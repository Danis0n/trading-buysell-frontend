import $api, {API_URL} from "../components/http"
import Message from "../model/Message"
import { TypeRequest } from "../model/SearchRequest"


export default class AdminService {

    static async powerHideById(id: string, userId: string, message: Message) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/hide/advert/${id}/user/${userId}`, message)
    }

    static async powerUnHideById(id: string, userId: string, message: Message) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/unhide/advert/${id}/user/${userId}`, message)
    }

    static async powerHideAll(userId: string, message: Message) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/hide/advert/user/${userId}`, message)
    }

    static async powerUnHideAll(userId: string, message: Message) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/unhide/advert/user/${userId}`, message)
    }

    static async powerDeleteById(advertId: string, message: Message) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/advert/delete/${advertId}`, message)
    }

    static async banUser(id: string, message: Message) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/users/ban/${id}`,message);    
    }

    static async unBanUser(id: string, message: Message) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/users/unban/${id}`,message);    
    }

    static async addNewType(id: string, request: TypeRequest) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/types/add/${id}`,request)
    }

}
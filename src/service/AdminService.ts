import $api, {API_URL} from "../components/http"
import Message from "../model/Message"


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

}
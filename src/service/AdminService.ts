import $api, {API_URL} from "../components/http"


export default class AdminService {

    static async powerHideById(id: string, userId: string) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/hide/advert/${id}/user/${userId}`)
    }

    static async powerUnHideById(id: string, userId: string) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/unhide/advert/${id}/user/${userId}`)
    }

    static async powerHideAll(userId: string) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/hide/advert/user/${userId}`)
    }

    static async powerUnHideAll(userId: string) : Promise<void> {
        return $api.post(`${API_URL}/api/admin/unhide/advert/user/${userId}`)
    }

}
import $api, {API_URL} from "../components/http";

export default class NotifyService {

    static async getAllUnviewed(id: string) : Promise<void> {
        return $api.get(`${API_URL}/api/notify/get/user/${id}/unviewed`)
    }

    static async getAllByUserId(id: string) : Promise<void> {
        return $api.get(`${API_URL}/api/notify/get/user/${id}/all`)
    }

    static async setViewedById(id: string) : Promise<void> {
        return $api.post(`${API_URL}/api/notify/set/notify/viewed/${id}`)
    }

    static async deleteById(id: string) : Promise<void> {
        return $api.delete(`${API_URL}/api/notify/delete/notify/${id}`)
    }
}
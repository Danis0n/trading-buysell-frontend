import $api, {API_URL} from "../components/http";

export default class NotifyService {

    static async getUnviewed(id: string) : Promise<void> {
        return $api.get(`${API_URL}/api/notify/get/user/${id}/unviewed`)
    }
}
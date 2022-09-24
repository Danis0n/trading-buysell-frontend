import axios, { AxiosResponse } from "axios";
import { AdvertResponse} from "../response/AdvertResponse";
import $api, { API_URL } from "../components/http";
import { Advert } from "../model/Advert";

export default class AdvertService {
// todo : implement service

    static async getAll() : Promise<AxiosResponse<Advert[]>> {
        return axios.get(`${API_URL}/api/advert/get/all`);
    }

    static async getId(id: string) : Promise<AxiosResponse<AdvertResponse>> {
        return axios.get(`${API_URL}/api/advert/get/${id}`);
    }

    static async create(formData: FormData) :Promise<void> {
        return $api.post(`${API_URL}/api/advert/create`, formData);
    }
}
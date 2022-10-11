import axios, { AxiosResponse } from "axios";
import { AdvertResponse} from "../response/AdvertResponse";
import $api, { API_URL } from "../components/http";
import { Advert } from "../model/Advert";
import { SearchRequest } from "../model/SearchRequest";
import { stringify } from "querystring";

export default class AdvertService {

    static async getAll() : Promise<AxiosResponse<Advert[]>> {
        return axios.get(`${API_URL}/api/advert/get/all`);
    }

    static async getId(id: string) : Promise<AxiosResponse<AdvertResponse>> {
        return axios.get(`${API_URL}/api/advert/get/${id}`);
    }

    static async getParams(title: string, type: string, location: string,
        minPrice: string, maxPrice: string) : Promise<AxiosResponse<Advert[]>> {
        return axios.post(`${API_URL}/api/advert/get/params`, {title, type, location, minPrice, maxPrice});
    }

    static async create(formData: FormData) : Promise<void> {
        return $api.post(`${API_URL}/api/advert/create`, formData);
    }

    static async update(id: string, formData: FormData) : Promise<void> {
        return $api.post(`${API_URL}/api/advert/update/${id}`, formData);
    }

    static async delete(id: string) : Promise<void> {
        return $api.delete(`${API_URL}/api/advert/delete/${id}`);
    }
}
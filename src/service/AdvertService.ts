import axios, { AxiosResponse } from "axios";
import { AdvertResponse} from "../response/AdvertResponse";
import $api, { API_URL } from "../components/http";
import { Advert } from "../model/Advert";
import { SearchRequest } from "../model/SearchRequest";

export default class AdvertService {

    static async getAll() : Promise<AxiosResponse<Advert[]>> {
        return axios.get(`${API_URL}/api/advert/get/all`);
    }
    
    static async getAllByUserId(id: string) : Promise<AxiosResponse<Advert[]>> {
        return axios.get(`${API_URL}/api/advert/get/user/${id}`);
    }

    static async getId(id: string) : Promise<AxiosResponse<AdvertResponse>> {
        return axios.get(`${API_URL}/api/advert/get/${id}`);
    }

    static async getParams(data : SearchRequest) : Promise<AxiosResponse<Advert[]>> {
        return axios.post(`${API_URL}/api/advert/get/params`, data);
    }

    static async getLatest() : Promise<AxiosResponse<Advert[]>> {
        return axios.get(`${API_URL}/api/advert/get/latest`);
    }

    static async getExamples() : Promise<AxiosResponse<Advert[]>> {
        return axios.get(`${API_URL}/api/advert/get/examples`);
    }

    static async getType(type: string) : Promise<AxiosResponse<Advert[]>> {
        return axios.get(`${API_URL}/api/advert/get/type/${type}`)
    }

    static async create(data: FormData) : Promise<void> {
        return $api.post(`${API_URL}/api/advert/create`, data);
    }

    static async update(id: string, data: FormData) : Promise<void> {
        return $api.post(`${API_URL}/api/advert/update/${id}`, data);
    }

    static async delete(id: string) : Promise<void> {
        return $api.delete(`${API_URL}/api/advert/delete/${id}`);
    }
}
import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../components/http";
import { CommentResponse } from "../response/CommentResponse";

export default class CommentService {
    
    static async create(to: string, createdBy: string, 
                                        advertName: string, title: string,
                                        description: string, rating: string
                                        ) : Promise<AxiosResponse<string>> {
        return $api.post('/api/comment/save',
                        {to, createdBy, advertName, title, description, rating})
    };

    static async delete(id: string) : Promise<void> {
        return $api.delete(`/api/comment/delete/${id}`);
    }

    static async fetchAll(id: string) : Promise<AxiosResponse<CommentResponse>> {
        return axios.get(`${API_URL}/api/comment/get/user/${id}`);
    }

}
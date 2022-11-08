import axios from "axios";
import { API_URL } from "../components/http";

export default class PasswordService {

    static async isEmailValid(email: string) : Promise<void> {
        return axios.get(`${API_URL}/api/password/restore/email/present?email=${email}`)
    }

    static async restorePassword(email: string, username: string) : Promise<void> {
        return axios.post(`${API_URL}/api/password/restore?username=${username}&email=${email}`)
    }

    static async updatePassword(token: string, password: string) : Promise<void> {
        return axios.post(`${API_URL}/api/password/update?token=${token}&password=${password}`)
    }


}
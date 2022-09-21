import { User } from "../components/model/User";

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    user: User;
}
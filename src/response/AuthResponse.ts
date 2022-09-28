import { User } from "../model/User";

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    user: User;
    value?: string
}
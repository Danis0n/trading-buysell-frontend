import { User } from "../models/User";

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    user: User;
}
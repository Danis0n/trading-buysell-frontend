import { User } from "../model/User";
import {makeAutoObservable} from 'mobx'
import AuthService from "../service/AuthService";
import axios from "axios";
import { AuthResponse } from "../response/AuthResponse";
import { API_URL } from "../components/http";

export default class Store {

    user = {} as User;
    isAuth = false;
    isLoading = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(auth: boolean){
        this.isAuth = auth
    }

    setUser(user: User){
        this.user = user
    }

    setLoading(load : boolean){
        this.isLoading = load
    }

    getAuth() : boolean {
        return this.isAuth
    }

    // todo : fix it bug
    async login(username: string, password: string){
        this.setLoading(true);
        try {
            const response = await AuthService.login(username,password);
            
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error);
        } finally{
            this.setLoading(false);
            // window.location.reload();
        }
    }
    
    // TODO : refactor this! & check it on backend
    async registration(username: string, name: string,
         password: string, email: string, phone: string ) {
        try {
            const response = await AuthService.registration(username,name,password,email,phone);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error);
        }
    }

    async logout(){
        this.setLoading(true);
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            
            this.setUser({} as User);  
        } catch (error) {
            console.log(error);
        } finally{
            this.setLoading(false);
            window.location.reload();
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(
                `${API_URL}/api/auth`, 
                {withCredentials: true}
            );
             
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
        } finally{
            this.setLoading(false);
        }
    }
}
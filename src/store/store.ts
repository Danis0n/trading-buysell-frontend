import { User } from "../model/User";
import {makeAutoObservable} from 'mobx'
import AuthService from "../service/AuthService";

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
        }
    }
    
    // TODO : refactor this! & check it on backend
    async register(name: string, username: string,
         password: string, email: string, phone: string ) {
        this.setLoading(true);
        try {
            const response = await AuthService.register(name,username,password,email,phone);
            console.log(response);
        } catch (error) {
            console.log(error);
        }finally{
            this.setLoading(false);
        }
    }

    async logout(){
        this.setLoading(true);
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as User);  
        } catch (error) {
            console.log(error);
        } finally{
            this.setLoading(false);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await AuthService.checkAuth();
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
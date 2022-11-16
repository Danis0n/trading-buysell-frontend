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

    async login(username: string, password: string) : Promise <any>{
        try {
            const response = await AuthService.login(username,password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
            return response;
        } catch (error) {
            console.log(error);
            return error
        } finally{
            this.setLoading(false)
        }
    }
    
    async register(data: FormData) : Promise <any> {
        this.setLoading(true);
        try {
            const response = await AuthService.register(data);
            if(response.data == 'email is not valid') {
                return 'email is not valid';
            }
            if(response.data == 'username is not valid') {
                return 'username is not valid';
            }
            return response;
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
            console.log(localStorage.getItem('token'));
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
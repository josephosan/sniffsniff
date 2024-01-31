import ApiService from './ApiService';
import { AxiosResponse } from 'axios';
import { User } from '../@types/auth';

export default class AuthService extends ApiService {
    public static baseUrl = 'user/auth/';

    public static login(data: User): Promise<AxiosResponse> {
        return this.post(`${this.baseUrl}login/`, data);
    }

    public static register(data: User): Promise<AxiosResponse> {
        return this.post(`${this.baseUrl}register/`, data);
    }

    public static who(): Promise<AxiosResponse> {
        return this.get(`${this.baseUrl}who`);
    }
}

import ApiService from './ApiService';
import {AxiosRequestConfig} from "axios";

export default class ProjectApiService extends ApiService {
    public static baseUrl = 'user/project/';

    public static getTermPaginate(config: AxiosRequestConfig = {}) {
        return this.get(`${this.baseUrl}term/paginate`, config);
    }

    public static inviteUser(data: any) {
        return this.put(`${this.baseUrl}invite`, data);
    }
}

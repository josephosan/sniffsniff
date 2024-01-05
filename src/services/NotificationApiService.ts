import ApiService from './ApiService';
import { AxiosRequestConfig } from 'axios';

export default class NotificationApiService extends ApiService {
    public static baseUrl = 'user/notification/';

    public static inviteReject(config: string) {
        return this.put(`${this.baseUrl}invite/reject`, config);
    }

    public static inviteAccept(config: string) {
        return this.put(`${this.baseUrl}invite/reject`, config);
    }
}

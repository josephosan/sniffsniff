import ApiService from './ApiService';

export default class NotificationApiService extends ApiService {
    public static baseUrl = 'user/notification/';

    public static inviteReject(data: never) {
        return this.put(`${this.baseUrl}invite/reject`, data);
    }

    public static inviteAccept(data: never) {
        return this.put(`${this.baseUrl}invite/reject`, data);
    }
}

import ApiService from './ApiService';

export default class NotificationApiService extends ApiService {
    public static baseUrl = 'user/notification/';

    public static inviteReject(id: string | undefined) {
        return this.put(`${this.baseUrl}invite/reject`, undefined, {params: {id}});
    }

    public static inviteAccept(id: string | undefined) {
        return this.put(`${this.baseUrl}invite/reject`, undefined, {params: {id}});
    }
}

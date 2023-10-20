import ApiService from "./ApiService";


export default class TimelineService extends ApiService {
    public static baseUrl = '/user/timeline';

    public static createTimeline(data) {
        return this.post(`${this.baseUrl}/`, data);
    }

    public static getATimeline(id) {
        return this.get(`${this.baseUrl}/${id}`);
    }
}
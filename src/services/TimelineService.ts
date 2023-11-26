import ApiService from './ApiService';

export default class TimelineService extends ApiService {
    public static baseUrl = 'user/timeline/';

    public static createTimeline(data) {
        return this.post(`${this.baseUrl}`, data);
    }

    public static getATimeline(id) {
        return this.get(`${this.baseUrl}${id}`);
    }

    public static editTimelineById(id, data) {
        return this.patch(`${this.baseUrl}${id}`, data);
    }

    public static createEventForTimeline(timelineId: string, formData: never) {
        return this.post(`${this.baseUrl}event/create/${timelineId}`, formData);
    }

    public static getTimelineEvents(timelineId: string) {
        return this.get(`${this.baseUrl}event/all/${timelineId}`);
    }

    public static getTimelineEvent(eventId: string) {
        return this.get(`${this.baseUrl}event/${eventId}`);
    }
}

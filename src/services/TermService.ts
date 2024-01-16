import ApiService from "./ApiService";

export default class TermService extends ApiService {
    public static baseUrl = 'user/term/';

    // task 
    public static createTask(data: any) {
        return this.post(`${this.baseUrl}task`, data);
    }

    public static comment(termId: string, data: any) {
        return this.post(`${this.baseUrl}${termId}/comment`, data);
    }

    public static updateTask(termId: string | undefined, data: any) {
        return this.patch(`${this.baseUrl}task/${termId}`, data);
    }
}

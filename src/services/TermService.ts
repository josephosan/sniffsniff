import ApiService from "./ApiService";

export default class TermService extends ApiService {
    public static baseUrl = 'user/term/';

    // task 
    public static createTask(data: any) {
        return this.post(`${this.baseUrl}task`, data);
    }
}

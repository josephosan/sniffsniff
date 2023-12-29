import ApiService from './ApiService';

export default class ProjectApiService extends ApiService {
    public static baseUrl = 'user/project/';

    public static getTermPaginate() {
        return this.get(`${this.baseUrl}term/paginate`);
    }
}

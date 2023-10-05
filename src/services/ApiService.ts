import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {NotificationStore} from "../@types/notify";


// Create a new instance of Axios with default headers
const api = axios.create({
    baseURL: 'base_url', // todo: get from env
});


export default class ApiService {
    private static notify;

    public static init(notifyStore: NotificationStore) {
        this.notify = notifyStore;
        this.initRequestInterceptor();
        this.initResponseInterceptor();
    }

    private static initRequestInterceptor() {
        axios.interceptors.request.use(
            function (config) {
                config.headers = {
                    'Authorization': 'Bearer ...' // todo: set headers here.
                }

                return config;
            },
            function (error) {
                // todo: notify user that an error happened.
                return Promise.reject(error);
            }
        );
    }

    private static initResponseInterceptor() {
        axios.interceptors.response.use(
            function (response) {
                if (response.status > 500) {
                    // todo: show server error to the user.
                } else if (response.status === 400) {
                    // todo: handle bad request and if needed set FormErrors.
                } else if (response.status === 403) {
                    // handle refresh token.
                } // and more.
                return response;
            },
            function (error) {
                // todo: notify the user that an error happened.
                return Promise.reject(error);
            }
        )
    }

    public static async get(resource: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return await api.get(resource, config);
    }

    public static async post(resource: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return await api.post(resource, config);
    }
    public static async patch(recourse: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return await api.patch(recourse, config);
    }
}

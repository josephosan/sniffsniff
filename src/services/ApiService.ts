import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {NotificationStore} from "../@types/notify";


// Create a new instance of Axios with default headers
const api = axios.create({
    baseURL: 'base_url', // todo: get from env
});


export default class ApiService {
    public static notify: NotificationStore | null = null;

    public static init(notifyStore: NotificationStore) {
        this.notify = notifyStore;

        this.setRequestInterceptors();
        this.setResponseInterceptors();
    }

    public static setRequestInterceptors() {
        api.interceptors.request.use(
            (config) => {
                config.headers = {
                    'Authorization': 'Bearer ...' // todo: set headers here.
                }

                return config;
            },
            (error) => {
                // todo: notify user that an error happened.
                return Promise.reject(error);
            }
        );
    }

    public static setResponseInterceptors() {
        api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const { response } = error;
                if (response.status >= 500) {
                    this.notify?.showAlert('error', 'خطا!', 'خطایی در اتصال به سرور رخ داد.');
                } else if (response.status === 400) {
                    console.log('bad request');
                    // todo: handle bad request and if needed set FormErrors.
                } else if (response.status === 403) {
                    // handle refresh token.
                } // and more.
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

    public static async delete(recourse: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return await api.delete(recourse, config);
    }
}

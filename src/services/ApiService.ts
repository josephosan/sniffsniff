import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {NotificationStore} from "../@types/notify";
import {AppStore} from "../@types/app";


const api = axios.create({
    baseURL: 'http://188.121.115.150:5000/v1',
});


export default class ApiService {
    public static notify: NotificationStore | null = null;
    public static appStore: AppStore | null = null;

    public static init(notifyStore: NotificationStore, appStore?: AppStore) {
        this.notify = notifyStore;
        this.appStore = appStore;

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
                if (response?.status >= 500) {
                    this.notify?.showAlert('error', 'خطا!', 'خطایی در اتصال به سرور رخ داد.');
                } else if (response?.status === 400) {
                    this.notify?.showAlert('error', response.data.error, response.data.message[0])
                } else if (response?.status === 403) {
                    // handle refresh token.
                } // and more.
                return Promise.reject(error);
            }
        )
    }

    public static async get(resource: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return await api.get(resource, config);
    }

    public static async post(resource: string, data: never, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return await api.post(resource, data, config);
    }

    public static async patch(recourse: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return await api.patch(recourse, config);
    }

    public static async delete(recourse: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return await api.delete(recourse, config);
    }
}

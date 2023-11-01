import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {NotificationStore} from "../@types/notify";
import {AppStore} from "../@types/app";
import {NavigateFunction} from "react-router-dom";
import {destroyToken, getToken, saveToken} from "../helpers/jwt.helper";
import {isArray} from "lodash";
import {appConfig} from "../config/app.config";


const api = axios.create({
    baseURL: 'http://188.121.115.150:5000/v1',
});


export default class ApiService {
    public static baseUrl = '';
    public static notify: NotificationStore | null = null;
    public static appStore: AppStore | null = null;
    public static navigate: NavigateFunction | null = null;

    private static ignoreNamesForHeaders: string[] = appConfig.ignoreNamesForAuth as string[];


    public static init(notifyStore: NotificationStore, appStore?: AppStore, navigate?: NavigateFunction) {
        this.notify = notifyStore;
        this.appStore = appStore;
        this.navigate = navigate;

        this.setRequestInterceptors();
        this.setResponseInterceptors();
    }

    public static setRequestInterceptors() {
        api.interceptors.request.use(
            (config) => {
                let canSetHeaders = !this.ignoreNamesForHeaders.some(el => config.url.indexOf(el) !== -1);
                if (getToken() && canSetHeaders) {
                    const tokens = JSON.parse(getToken());
                    config.headers = {
                        ...config.headers,
                        'Authorization': `Bearer ${tokens['accessToken']}`
                    }
                } else if (!canSetHeaders) {
                    delete config.headers['Authorization'];
                }

                canSetHeaders = true;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public static setResponseInterceptors() {
        api.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const {response} = error;
                if (response?.status >= 500) {
                    this.notify?.showAlert('error', 'خطا!', 'خطایی در اتصال به سرور رخ داد.');
                } else if (response?.status === 400) {
                    this.notify?.showAlert('error', response.data.error, isArray(response.data.message) ? response.data.message[0] : response.data.message);
                } else if (response?.status === 404) {
                    this.notify?.showAlert('error','خطا!', 'یافت نشد.')
                } else if (response?.status === 403) {
                    this.navigate('/login');
                } else if (response?.status === 401 && !(error.config.url.indexOf('rotate') > 0)) {
                    const tokens = await this.refreshToken();

                    if (tokens) {
                        const config = error.config;
                        config.headers = {
                            ...config.headers,
                            'X-Token-Refresh': 'true',
                            'Authorization': `Bearer ${tokens['accessToken']}`
                        }
                        return api(config);
                    }
                }
                return Promise.reject(error);
            }
        )
    }

    public static setHeader(key: string, value: string) {
        api.interceptors.request.use(
            (config) => {
                config.headers = {
                    ...config.headers,
                    [key]: value
                }
                return config;
            }, (error) => {
                return Promise.reject(error);
            }
        )
    }

    public static removeHeader(key: string) {
        api.interceptors.request.use(
            (config) => {
                delete config.headers[key];

                return config;
            }, (error) => {
                return Promise.reject(error);
            }
        )
    }

    public static async refreshToken(): Promise<{ refreshToken: string, accessToken: string } | null> {
        if (!getToken()) {
            this.navigate('/login');
        }

        try {
            this.removeHeader('Authorization');
            const {data} = await this.post('user/auth/rotate', {
                refreshToken: JSON.parse(getToken())['refreshToken']
            });

            const tokens: { refreshToken: string, accessToken: string } = data.data;
            if (tokens) {
                this.setHeader('Authorization', `Bearer ${tokens.accessToken}`);
                saveToken("ID_TOKEN", JSON.stringify(tokens));
            }

            return tokens;
        } catch (err) {
            destroyToken();
            this.notify?.showAlert('warning', 'ورود دوباره', 'توکن شما باطل شده, لطفا دوباره وارد شوید!');
            return null;
        }
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

    public static async put(recourse: string, data: never, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return await api.put(recourse, data, config);
    }


    // helper methods
    public static async getAll(config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return this.get(this.baseUrl, config);
    }

    public static async paginateAll(config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return this.get(this.baseUrl + "/paginate", config);
    }
}

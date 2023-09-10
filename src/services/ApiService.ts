import {AxiosRequestConfig, AxiosResponse} from "axios";
import axios from "axios";

export default class ApiService {
    public static baseUrl: string = import.meta.url || ''; // todo: getting from env.

    public static get(recourse: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        // todo: use a set header function to add necessary headers here.

        return new Promise((resolve, reject) => {
            axios.get(`${this.baseUrl}/${recourse}`, config)
                .then(res => {
                    // todo: handle authentication errors or more here. if not authenticated, use router to
                    // todo: send them to login page.
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }


    public static post(recourse: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {

        return new Promise((resolve, reject) => {
            axios.post(`${this.baseUrl}/${recourse}`, config)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}
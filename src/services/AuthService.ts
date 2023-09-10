import ApiService from "./ApiService";
import {AxiosResponse} from "axios";

export type LoginUser = {
    username: string,
    password: string,
    companyName: string
}

export default class AuthService extends ApiService {
    public static baseUrl = 'user/';

    public static login(data: LoginUser): Promise<AxiosResponse> {
        return this.get(`${ApiService.baseUrl}/auth/login`, { data: data });
    }

    // todo: implement refresh token.
}
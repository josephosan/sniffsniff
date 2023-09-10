import ApiService from "./ApiService";
import {AxiosResponse} from "axios";
import {User} from "../@types/auth";

export default class AuthService extends ApiService {
    public static baseUrl = 'user/';

    public static login(data: User): Promise<AxiosResponse> {
        return this.get(`${this.baseUrl}/auth/login`, { data: data });
    }

    // todo: implement refresh token.
}
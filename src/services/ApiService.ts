import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create a new instance of Axios with default headers
const api = axios.create({
  baseURL: 'base_url_here', // to get from .env
  headers: {
    'Authorization': 'Bearer token_here',
    'Content-Type': 'application/json',
  },
});

export default class ApiService {
  public static async get(resource: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    try {
      // Use the Axios instance to make GET requests with common headers
      return await api.get(resource, config);
    } catch (error) {
      throw error;
    }
  }

  public static async post(resource: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    try {
      // Use the Axios instance to make POST requests with common headers
      return await api.post(resource, config);
    } catch (error) {
      throw error;
    }
  }
}

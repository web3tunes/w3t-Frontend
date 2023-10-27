import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getLocalstorageData } from './localstorageHelper';
import { ADMIN_JWT_TOKEN, JWT_TOKEN } from './constant';



const createAxiosInstance = (): AxiosInstance => {
    const api: AxiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getLocalstorageData(JWT_TOKEN)}`
        },
        responseType: 'json',
        httpsAgent: false,
    });
    api.interceptors.request.use(
        (config) => {
            const token = getLocalstorageData(JWT_TOKEN);

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log("request config", config);
            return config;
        },
        (error) => {
            // console.log("request error", error);
            return Promise.reject(error);
        }
    );
    api.interceptors.response.use(
        (response: AxiosResponse) => response.data,
        async (error: any) => {
            if (error.response) {
                // Handle specific status codes here (e.g., redirect to error pages)
                // For example:
                // if (error.response.status === 401) {
                //   // redirect to the login page
                // }

                // Reject with the error response for custom error handling downstream
                return Promise.reject(error.response.data);
            } else {
                // Handle network errors or other unforeseen issues
                return Promise.reject('Network Error');
            }
        }
    );

    return api;
};

const api = createAxiosInstance();

const createAdminAxiosInstance = (): AxiosInstance => {
    const api: AxiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL_ADMIN,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getLocalstorageData(ADMIN_JWT_TOKEN)}`
        },
        responseType: 'json',
        httpsAgent: false,
    });
    api.interceptors.request.use(
        (config) => {
            const token = getLocalstorageData(ADMIN_JWT_TOKEN);

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log("request config", config);
            return config;
        },
        (error) => {
            // console.log("request error", error);
            return Promise.reject(error);
        }
    );
    api.interceptors.response.use(
        (response: AxiosResponse) => response.data,
        async (error: any) => {
            if (error.response) {
                // Handle specific status codes here (e.g., redirect to error pages)
                // For example:
                // if (error.response.status === 401) {
                //   // redirect to the login page
                // }

                // Reject with the error response for custom error handling downstream
                return Promise.reject(error.response.data);
            } else {
                // Handle network errors or other unforeseen issues
                return Promise.reject('Network Error');
            }
        }
    );

    return api;
};

const adminAPI = createAdminAxiosInstance();
export { adminAPI }

export default api;

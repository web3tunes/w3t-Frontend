import api, { adminAPI } from './httpBase';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getLocalstorageData } from './localstorageHelper';
import { ADMIN_JWT_TOKEN, JWT_TOKEN } from './constant';

// Helper method for handling GET requests
const getRequest = async <T>(url: string, params?: any): Promise<any> => {
    try {
        const response: AxiosResponse<T> = await api.get(url, { params });
        return response;
    } catch (error) {
        return error;
    }
};

// Helper method for handling POST requests
const postRequest = async <T>(url: string, data: any): Promise<any> => {
    try {
        const response: AxiosResponse<T> = await api.post(url, data);
        return response;
    } catch (error) {
        return error;
    }
};

// Helper method for handling PUT requests
const putRequest = async <T>(url: string, data: any): Promise<any> => {
    try {
        const response: AxiosResponse<T> = await api.put(url, data);
        return response;
    } catch (error) {
        return error;
    }
};

// Helper method for handling DELETE requests
const removeRequest = async <T>(url: string): Promise<any> => {
    try {
        const response: AxiosResponse<T> = await api.delete(url);
        return response;
    } catch (error) {
        return error;
    }
};


const getAdminRequest = async <T>(url: string, params?: any): Promise<any> => {
    try {
        const response: AxiosResponse<T> = await adminAPI.get(url, { params });
        return response;
    } catch (error) {
        return error;
    }
};

// Helper method for handling POST requests
const postAdminRequest = async <T>(url: string, data: any): Promise<any> => {
    try {
        const response: AxiosResponse<T> = await adminAPI.post(url, data);
        return response;
    } catch (error) {
        return error;
    }
};

// Helper method for handling PUT requests
const putAdminRequest = async <T>(url: string, data: any): Promise<any> => {
    try {
        const response: AxiosResponse<T> = await adminAPI.put(url, data);
        return response;
    } catch (error) {
        return error;
    }
};

// Helper method for handling DELETE requests
const removeAdminRequest = async <T>(url: string): Promise<any> => {
    try {
        const response: AxiosResponse<T> = await adminAPI.delete(url);
        return response;
    } catch (error) {
        return error;
    }
};





interface UploadResponse {
    // Define the response interface based on the expected response from the server.
    // Modify it according to the actual response structure.
    success: boolean;
    message: string;
    // Add other properties as needed.
}

const uploadFilesFormData = async (url: string, formData: FormData): Promise<UploadResponse> => {
    try {
        const response: AxiosResponse<UploadResponse> = await axios.post<UploadResponse>(
            url,
            formData,
            {
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getLocalstorageData(JWT_TOKEN)}` // Assuming JWT_TOKEN is a string type
                }
            }
        );

        return response.data;
    } catch (error) {
        // Handle errors or throw the error for handling in the calling function.
        throw error;
    }
};

const adminUploadFilesFormData = async (url: string, formData: FormData): Promise<UploadResponse> => {
    try {
        const response: AxiosResponse<UploadResponse> = await axios.post<UploadResponse>(
            url,
            formData,
            {
                baseURL: process.env.NEXT_PUBLIC_API_URL_ADMIN,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getLocalstorageData(ADMIN_JWT_TOKEN)}` // Assuming JWT_TOKEN is a string type
                }
            }
        );

        return response.data;
    } catch (error) {
        // Handle errors or throw the error for handling in the calling function.
        throw error;
    }
};

export {
    getRequest,
    postRequest,
    putRequest,
    removeRequest,
    uploadFilesFormData,
    getAdminRequest,
    postAdminRequest,
    putAdminRequest,
    removeAdminRequest,
    adminUploadFilesFormData
};

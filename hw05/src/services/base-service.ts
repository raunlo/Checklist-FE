import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';

export abstract class BaseService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    protected static getAxiosConfiguration(token: string | null): AxiosRequestConfig | undefined {
        if (!token) return undefined;
        const config: AxiosRequestConfig = {
            headers: {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Expires: '0',
                Authorization: 'Bearer ' + token
            }
        };  
        return config;      
    }

    static async getAll<TEntity>(apiEndpoint: string, token: string | null): Promise<IFetchResponse<TEntity[]>> {
        try {
            let response = await this.axios.get<TEntity[]>(apiEndpoint, BaseService.getAxiosConfiguration(token));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

    static async get<TEntity>(apiEndpoint: string, id: string, token: string | null): Promise<IFetchResponse<TEntity>> {
        try {
            apiEndpoint = apiEndpoint + id;
            let response = await this.axios.get<TEntity>(apiEndpoint, BaseService.getAxiosConfiguration(token));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data 
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

    static async delete<TEntity>(apiEndpoint: string, id: string, token: string | null): Promise<IFetchResponse<TEntity>> {
        try {
            apiEndpoint = apiEndpoint + id;

            let response = await this.axios.delete<TEntity>(apiEndpoint, BaseService.getAxiosConfiguration(token));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

    static async post<TEntity>(apiEndpoint: string, entity: TEntity, token: string | null): Promise<IFetchResponse<TEntity>> {
        try {
            let response = await this.axios.post<TEntity>(apiEndpoint, entity, BaseService.getAxiosConfiguration(token));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data 
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

    static async put<TEntity>(apiEndpoint: string, id: string, entity: TEntity, token: string | null): Promise<IFetchResponse<TEntity>> {
        try {
            apiEndpoint = apiEndpoint + id;
            
            let response = await this.axios.put<TEntity>(apiEndpoint, entity, BaseService.getAxiosConfiguration(token));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data 
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

}

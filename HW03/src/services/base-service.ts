import { HttpClient } from "aurelia";
import { IFetchResponse } from "../types/IFetchResponse";
import { IJwt } from "../types/IJwt";
import { IMessage } from "../types/IMessage";

export class BaseService<TEntity> {
    constructor(protected apiEndpointUrl: string, protected httpClient: HttpClient, private jwt: string | undefined) {

    }

    private authHeaders = this.jwt !== undefined ?
    {
        'Authorization': 'Bearer ' + this.jwt
    } : { };



    async getAll(): Promise<IFetchResponse<TEntity[]>> {
        let url = this.apiEndpointUrl;

        try {

            const response = await this.httpClient.fetch(
                url, 
                {
                    cache: "no-store",
                    headers: this.authHeaders
                }
            );
            if (response.ok) {
                const data = (await response.json()) as TEntity[];
                return {
                    statusCode: response.status,
                    data: data,
                };
            } 

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };

        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };            

        }
    }

    async get(id: string): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + '/' + id;

        try {
            const response = await this.httpClient.fetch(
                url, 
                {
                    cache: "no-store",
                    headers: this.authHeaders
                }
            );
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data,
                };
            } 

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };

        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };            

        }
    }

    async put(entity: TEntity): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + '/' + entity['id'];

        let entityStr = JSON.stringify(entity);

        try {
            const response = await this.httpClient.put(url, entityStr, { cache: "no-store", headers: this.authHeaders });
            if (response.ok) {
                return {
                    statusCode: response.status,
                    data: undefined,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

    async create(name: string, sort: number): Promise<IFetchResponse<IJwt | IMessage>> {
        let url = this.apiEndpointUrl;

        try {
            let body = {"categoryName": name, "categorySort": sort};
            let bodyStr = JSON.stringify(body)
            const response = await this.httpClient.post(url, bodyStr, { cache: "no-store", headers: this.authHeaders });
            
            if (response.ok) {
                const data = (await response.json()) as IJwt;
                return {
                    statusCode: response.status,
                    data: data,
                };
            } 

            const data = (await response.json()) as IMessage;

            return {
                statusCode: response.status,
                errorMessage: response.statusText + '' + data.messages.join(' '),
            };

        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };            

        }

    }

    async delete(entity: TEntity): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + '/' + entity['id'];

        let entityStr = JSON.stringify(entity['id']);

        try {
            const response = await this.httpClient.delete(url, entityStr, { cache: "no-store", headers: this.authHeaders });
            if (response.ok) {
                return {
                    statusCode: response.status,
                    data: undefined,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }


}
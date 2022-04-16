import { IFetchResponse } from "@/types/IFetchResponse";
import axios from 'axios';

export class BaseService<TEntity> {
    constructor(protected apiEndpointUrl: string, protected queryString: string) {
        console.log('BaseService.constructor');
    }

    private authHeaders = {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
        };

    async getAll(): Promise<IFetchResponse<TEntity[]>> {
        const url = this.apiEndpointUrl + this.queryString;

        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity[],
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
        const url = this.apiEndpointUrl + '/' + id + this.queryString;

        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
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

    async delete(id: string): Promise<IFetchResponse<TEntity>> {
        const url = this.apiEndpointUrl + '/' + id + this.queryString;

        try {
            const response = await axios.delete(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
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

    async put(id: string, entity: TEntity): Promise<IFetchResponse<TEntity>> {
        const url = this.apiEndpointUrl + '/' + id + this.queryString;

        try {
            const response = await axios.put(url, entity, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
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

    async post(entity: TEntity): Promise<IFetchResponse<TEntity>> {
        const url = this.apiEndpointUrl + this.queryString;

        try {
            const response = await axios.post(url, entity, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
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

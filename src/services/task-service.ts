import { Task } from "@/domain/task";
import { FetchResponse } from "@/types/FetchResponse";
import axios from "axios";
import { ApplicationJsonHeaders } from "@/constants/service-constants";
import { ChangeOrderRequestPayload } from "@/domain/change-order-request-payload";

export class TaskService {
    // eslint-disable-next-line no-useless-constructor
    constructor(private basePath: string) {
    }

    async getAll(checklistId: number): Promise<FetchResponse<Task[]>> {
        try {
            const response = await axios.get(`${this.basePath}/v1/checklist/${checklistId}/task`, { headers: ApplicationJsonHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as Task[],
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 500,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async get(checklistId: number, taskId: number): Promise<FetchResponse<Task>> {
        try {
            const response = await axios.get(`${this.basePath}/v1/checklist/${checklistId}/task/${taskId}`, { headers: ApplicationJsonHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as Task,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 500,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async delete(checklistId: number, taskId: number): Promise<FetchResponse<void>> {
        try {
            const response = await axios.delete(`${this.basePath}/v1/checklist/${checklistId}/task/${taskId}`, { headers: ApplicationJsonHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: undefined
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 500,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async update(checklistId: number, task: Task): Promise<FetchResponse<Task>> {
        try {
            const response = await axios.put(`${this.basePath}/v1/checklist/${checklistId}/task/${task.id}`, task, { headers: ApplicationJsonHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as Task
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 500,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async post(checklistId: number, task: Task): Promise<FetchResponse<Task>> {
        try {
            const response = await axios.post(`${this.basePath}/v1/checklist/${checklistId}/task`, task, { headers: ApplicationJsonHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as Task
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 500,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async changeOrder(requestPayload: ChangeOrderRequestPayload): Promise<FetchResponse<void>> {
        try {
            const response = await axios.patch(`${this.basePath}/v1/checklist/${requestPayload.checklistId}/task/change-order`, requestPayload, { headers: ApplicationJsonHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as void
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 500,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}

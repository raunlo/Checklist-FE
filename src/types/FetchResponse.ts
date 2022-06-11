export interface FetchResponse<TData> {
    statusCode: number;
    errorMessage?: string;
    data?: TData;
}

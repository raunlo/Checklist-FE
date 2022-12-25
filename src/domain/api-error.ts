export interface ErrorPayload {
    reason: string,
    errorCode: string
}

export class ApiError extends Error {
    // eslint-disable-next-line handle-callback-err
    constructor(public error: ErrorPayload) {
        super();
    }
}

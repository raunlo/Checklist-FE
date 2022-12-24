export interface ErrorPayload {
    message: string,
    errorCode: string
}

export class ApiError extends Error {
    // eslint-disable-next-line handle-callback-err
    constructor(private error: ErrorPayload) {
        super();
    }

    getError(): ErrorPayload {
        return this.error
    }
}

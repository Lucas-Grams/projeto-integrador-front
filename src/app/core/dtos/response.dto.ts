export interface ResponseDTO<T> {
    msg: string;
    status: ResponseStatus,
    data: T
}

export enum ResponseStatus {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING"
}

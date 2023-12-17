export interface ResponseDto<T = any> {
    status: ResponseDto.Status;
    msg?: String;
    data?: T;
}

export namespace ResponseDto{
    export enum Status{
        SUCCESS = 'SUCCESS',
        WARNING = 'WARNING',
        ERROR = 'ERROR'
    }
}


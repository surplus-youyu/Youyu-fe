export interface IResponse<D, P = {}> {
    data?: D;
    msg: string;
    paramData: P;
    status: string;
    time: string;
}

export interface IGeneralResponse {
    status: boolean;
    msg: string;
}

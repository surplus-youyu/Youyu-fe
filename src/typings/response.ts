export interface OJData<D, P = {}> {
    data?: D;
    msg: string;
    paramData: P;
    status: string;
    time: string;
}

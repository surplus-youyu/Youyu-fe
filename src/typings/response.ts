export interface IResponse<D, P = {}> {
    data?: D;
    msg: string;
    paramData: P;
    status: boolean;
    time: string;
}

export interface IQueryQuestionnaireResponse {
    tid: number;
    owner: number;
    title: string;
    summary: string;
    type: string;
    bounty: number;
    extra: string;
}

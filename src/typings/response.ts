export interface IResponse<D, P = {}> {
    data?: D;
    msg: string;
    paramData: P;
    status: boolean;
    time: string;
}

export interface IQueryQuestionnaireResponse {
    id: number;
    creator: number;
    title: string;
    description: string;
    type: string;
    reward: number;
    content: string;
}

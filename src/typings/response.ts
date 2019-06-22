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
    type: 'TASK_TYPE_CUSTOM' | 'TASK_TYPE_SURVEY';
    reward: number;
    content: string;
    limit: number;
    assigned: number;
}

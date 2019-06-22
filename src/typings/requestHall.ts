export interface SortMap {
    [key: string]: any;
    time: 0 | 1 | -1;  // -1 = 从小到大，1 = 从大到小， 0 = 默认。
    bounty: 0 | 1 | -1;
    type: 'TASK_TYPE_SURVEY' | 'TASK_TYPE_CUSTOM' | '';
}

export interface RequsetMsg {
    [key: string]: any;
    title: string;
    tags?: string[];
    summary?: string;
    bounty: number;
    campus: 'east' | 'north' | 'south' | 'Shenzhen';
    owner: string;
    created_at: string;
}

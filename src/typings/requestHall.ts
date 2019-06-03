export interface SortMap {
    time: 0 | 1 | -1;  // -1 = 从小到大，1 = 从大到小， 0 = 默认。
    price: 0 | 1 | -1;
    campus: 'east' | 'north' | 'south' | 'Shenzhen' | '';
}

export interface RequsetMsg {
    title: string;
    tags?: string[];
    desc?: string;
    price: number;
    campus: 'east' | 'north' | 'south' | 'Shenzhen';
    owner: string;
    publishTime: string;
}

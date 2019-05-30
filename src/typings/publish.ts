export interface IQuestionare {
  id?: number;
  title: string;
  publisher_id: number;
  bounty: number;
  content: IQuestionareContent[];
}

export interface IQuestionareContent {
  title: string;
  type: 1 | 2 | 3; // 单选 1, 多选 2, 填空 3
  options: string[];
  optional: boolean;
  limit: number;
}

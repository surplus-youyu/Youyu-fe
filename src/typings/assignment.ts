import { IQuestionnaireContent } from './publish';

export interface IAssignment {
  id: number;
  task_id: number;
  type: string;
  status: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface IAssignmentFeedback {
  id: number;
  content: IQuestionnaireContent[] | string;
  status: string;
  task_id: number;
  created_at: string;
  updated_at: string;
}

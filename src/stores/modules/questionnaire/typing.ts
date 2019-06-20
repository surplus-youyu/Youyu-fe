import { IQuestionnaire } from '@/typings/publish';
import { IAssignmentFeedback } from '@/typings/assignment';

export interface State {
  currentQuestionnaire: IQuestionnaire | null;
  questionnaireSumitList: IAssignmentFeedback[];
}

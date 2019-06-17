import { ITask } from '@/typings/task';

export interface State {
  publicTasks: ITask[];
  ownTasks: ITask[];
}

import { RequsetMsg } from '@/typings/requestHall';

export interface State {
  [key: string]: any;
  publicRequests: RequsetMsg[] | null;
  selfRequestsSent: RequsetMsg[] | null;
  selfRequestsReceived: RequsetMsg[] | null;
  selfRequestsDone: RequsetMsg[] | null;
  selfRequestsDraft: RequsetMsg[] | null;
}

export interface KeyToValueMap {
    [key: string]: any;
}

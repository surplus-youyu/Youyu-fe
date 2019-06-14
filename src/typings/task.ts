export interface ITask {
  id: number;
  creator: number;
  title: string;
  description: string;
  type: string;
  content: string;
  reward: number;
  created_at: string;
}

export interface State {
  user: IUserInfo | null;
}

export interface IUserInfo {
  nickname: string;
  avatar?: string;
  age: number;
  gender: 'm' | 'f';
  balance: number;
  phone: string;
  email: string;
  password: string;
  grade: string;
  major: string;
}

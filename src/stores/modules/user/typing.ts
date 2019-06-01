export interface State {
  user: IUserInfo | null;
}

export interface IUserInfo {
  uid: number;
  real_name: string;
  nick_name: string;
  avatar?: string;
  age: number;
  gender: 'm' | 'f';
  balance: number;
  major: string;
  grade: number;
  phone: string;
  email: string;
}

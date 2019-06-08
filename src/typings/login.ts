export interface LoginFormFieldsEP {
    // 0 为账号密码登录， 1为手机登录
    loginType: 0;
    email: string | undefined;
    password: string;
  }

export interface LoginFormFieldsPV {
    // 0 为账号密码登录， 1为手机登录
    loginType: 1;
    phone: string;
    veriCode: string;
}

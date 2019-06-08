<template>
  <div id="login-view">
    <div id="login-card">
      <div class="headers">
        <h1><router-link to="/" style="color: #515a6e;"><span class="logo">Surplus</span></router-link> 有余</h1>
        <p>一个面向大学生的专业“众包”系统</p>
      </div>
      <Tabs :animated="false" v-model="loginType">
        <TabPane name="UPlogin" label="账号登录">
          <Input placeholder="邮箱" size="large" v-model="loginFormEP.email"/>
          <Input placeholder="密码" type="password" size="large" v-model="loginFormEP.password"/>
          <div class="login-ctrl">
            <Checkbox size="large">自动登录</Checkbox>
            <span>忘记密码</span>
          </div>
          <Button type="primary" size="large" @click="login">登录</Button>
          <div class="login-ctrl">
            <span>其他登录方式</span>
            <a class="signup" @click="signUp">注册用户</a>
          </div>
        </TabPane>
        <TabPane name="PVlogin" label="手机登录">
          <Input placeholder="手机号" size="large" v-model="loginFormPV.phone"/>
          <div class="certificate">
            <Input id="inp" placeholder="验证码" size="large" v-model="loginFormPV.veriCode"/>
            <div class="space"></div>
            <Button id="get-cert" size="large">获取验证码</Button>
          </div>
          <Button type="primary" size="large"  @click="login">登录</Button>
          <div class="login-ctrl">
            <span>其他登录方式</span>
            <a class="signup" @click="signUp">注册用户</a>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LoginFormFieldsEP, LoginFormFieldsPV } from '@/typings/login';
import { LOAD_USER_PROFILE, LOGIN } from '@/stores/modules/user/constants';
@Component({
  name: 'login'
})
export default class Login extends Vue {

  loginFormEP: LoginFormFieldsEP = {
    loginType: 0,
    email: undefined,
    password: ''
  };

  loginFormPV: LoginFormFieldsPV = {
    loginType: 1,
    phone: '',
    veriCode: ''
  };

  loginType = 'UPlogin';

  async login() {
    let fields;
    if (this.loginType === 'UPlogin') {
      fields = Object.freeze({ ...this.loginFormEP });
    } else {
      fields = Object.freeze({ ...this.loginFormPV });
    }
    const result = await this.$store.dispatch(`user/${LOAD_USER_PROFILE}`, fields);
    //  const result = await this.$store.dispatch(`user/${LOAD_USER_PROFILE}`, { fields });
    if (!result.status) {
      this.$Notice.warning({
        title: '登录失败',
        desc: result.msg
      });
    } else {
      this.$Notice.success({
          title: '登录成功',
          desc: result.msg
      });
      this.$router.push({ name: 'home' });
    }
  }

  signUp() {
    this.$router.push({ name: 'signup' });
  }
}

</script>

<style lang="less">
#login-view {
  background-image: url('../assets/login-background.jpg');
  height: 100vh;
  display: flex;
  justify-content: center;
  #login-card {
    width: 356px;
  }
  .headers {
    padding-top: 15vh;
    padding-bottom: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
    h1 {
      font-size: 16px;
      display: flex;
      align-items: center;
      padding-left: 4px;
    }
    .logo {
      font-family: Logo;
      font-size: 48px;
      padding-right: 8px;
    }
  }
  .ivu-tabs-bar {
    margin-bottom: 24px;
  }
  .ivu-tabs-nav {
    width: 100%;
    text-align: center;
    .ivu-tabs-tab {
      width: 48%;
      margin-right: 0;
    }
  }
  .ivu-input-wrapper {
    width: 100%;
    margin-bottom: 20px;
  }
  .login-ctrl {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    
    .signup {
      text-decoration: none;
    }
  }
  .ivu-btn {
    width: 100%;
    margin-bottom: 20px;
  }
  .certificate {
    display: flex;
    justify-content: space-between;
    #inp {
      flex: 8;
      margin-right: 4px;
    }
    #get-cert {
      flex: 2;
    }
  }
}
</style>

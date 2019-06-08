<template>
  <div id="signup-view">
    <div id="signup-card">
      <div class="headers">
        <h1><router-link to="/" style="color: #515a6e;"><span class="logo">Surplus</span></router-link> 有余</h1>
        <p>一个面向大学生的专业“众包”系统</p>
      </div>
      <div class="sub-title">注册</div>
      <Input type="email" placeholder="邮箱" size="large" v-model="signUpForm.email"/>
      <Input type="password" placeholder="6-16位密码，区分大小写" size="large" v-model="signUpForm.password"/>
      <Input type="password" placeholder="确认密码" size="large" v-model="signUpForm.confirmPassword"/>
      <Input placeholder="11位手机号" size="large" v-model="signUpForm.phone">
        <Select v-model="phoneType" slot="prepend" style="width: 60px">
          <Option value="86">+ 86</Option>
        </Select>
      </Input>
      <div class="certificate">
        <Input placeholder="输入验证码" size="large" v-model="signUpForm.veriCode"/>
        <Button size="large">获取验证码</Button>
      </div>
      <div class="signup-ctrl">
        <Button type="primary" size="large" @click="signUp">注册</Button>
        <a class="link" @click="login">使用已有账户登录</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SignUpFormFields } from '@/typings/signup';
import { LOAD_USER_PROFILE, SIGNUP } from '@/stores/modules/user/constants';

@Component({
  name: 'signup'
})
export default class Signup extends Vue {
  phoneType = '86';

  signUpForm: SignUpFormFields = {
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    veriCode: ''
  };

  async signUp() {
    let fields = Object.freeze({ ...this.signUpForm });
    const result = await this.$store.dispatch(`user/${LOAD_USER_PROFILE}`, fields);
    //  const result = await this.$store.dispatch(`user/${LOAD_USER_PROFILE}`, { fields });
    if (!result.status) {
      this.$Notice.warning({
        title: '注册失败',
        desc: result.msg
      });
    } else {
      this.$Notice.success({
          title: '注册成功',
          desc: result.msg
      });
      this.$router.push({ name: 'home' });
    }
  }

  login() {
    this.$router.push({ name: 'login' });
  }
}
</script>

<style lang="less">
#signup-view {
  background-image: url('../assets/login-background.jpg');
  height: 100vh;
  display: flex;
  justify-content: center;
  .sub-title {
    font-size: 16px;
    margin-bottom: 20px;
  }
  #signup-card {
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
      display: flex;
      align-items: center;
      font-size: 16px;
      padding-left: 4px;
    }
    .logo {
      font-family: Logo;
      font-size: 48px;
      padding-right: 8px;
    }
  }
  .certificate {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .ivu-input-wrapper {
      flex: 8;
      margin-right: 4px;
    }
    .ivu-btn {
      flex: 2;
    }
  }
  .signup-ctrl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ivu-btn {
      flex: 1;
      margin-bottom: 0;
    }
    .link {
      flex: 1;
      text-align: right;
      text-align: none;
    }
  }
  .ivu-input-wrapper {
    width: 100%;
    margin-bottom: 20px;
  }
  .ivu-btn {
    width: 100%;
    margin-bottom: 20px;
  }
  
}
</style>

<template>
  <div id="signup-view">
    <div id="signup-card">
      <div class="headers">
        <h1><router-link to="/" style="color: #515a6e;"><span class="logo">Surplus</span></router-link> 有余</h1>
        <p>一个面向大学生的专业“众包”系统</p>
      </div>
      <div class="sub-title">注册</div>
      <Poptip trigger="focus" content="昵称" placement="top-start">
        <Input type="text" placeholder="昵称" size="large" v-model="signUpForm.nickname"/>
      </Poptip>
      <Poptip trigger="focus" content="邮箱" placement="top-start">
        <Input type="email" placeholder="邮箱" size="large" v-model="signUpForm.email"/>
      </Poptip>
      <Poptip trigger="focus" content="手机号码" placement="top-start">
        <Input type="tel" placeholder="手机号码" size="large" v-model="signUpForm.phone"/>
      </Poptip>
      <Poptip trigger="focus" content="6-16位密码，区分大小写" placement="top-start">
        <Input type="password" placeholder="6-16位密码，区分大小写" size="large" v-model="signUpForm.password"/>
      </Poptip>
      <Poptip trigger="focus" content="确认密码" placement="top-start">
        <Input type="password" placeholder="确认密码" size="large" v-model="signUpForm.confirmPassword"/>
      </Poptip>
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
import { SIGNUP } from '@/stores/modules/user/constants';

@Component({
  name: 'signup'
})
export default class Signup extends Vue {
  phoneType = '86';

  signUpForm: SignUpFormFields = {
    nickname: '',
    email: '',
    age: 0,
    phone: '',
    gender: 'm',
    password: '',
    confirmPassword: ''
  };

  async signUp() {
    // confirm password
    if (this.signUpForm.password !== this.signUpForm.confirmPassword) {
      this.$Notice.warning({
        title: '密码不一致'
      });
      return;
    }

    const fields = Object.freeze({ ...this.signUpForm });
    const result = await this.$store.dispatch(`user/${SIGNUP}`, fields);
    //  const result = await this.$store.dispatch(`user/${LOAD_USER_PROFILE}`, { fields });
    if (result !== 'OK') {
      this.$Notice.warning({
        title: '注册失败',
        desc: result.msg
      });
    } else {
      this.$Notice.success({
          title: '注册成功',
          desc: result.msg
      });
      this.$router.push({ name: 'login' });
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
  .ivu-poptip, .ivu-poptip-rel {
    width: 100%;
  }
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

  .detail-wrapper {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    .sub-title {
      margin-bottom: 0;
      margin-right: 10px;
    }
  }
}
</style>

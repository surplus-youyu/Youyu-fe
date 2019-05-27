<template>
  <div id="login-view">
    <div id="login-card">
      <div class="headers">
        <h1><span class="logo">Surplus</span> 有余</h1>
        <p>一个面向大学生的专业“众包”系统</p>
      </div>
      <Tabs :animated="false">
        <TabPane label="账号登录">
          <Input placeholder="账号" size="large"/>
          <Input placeholder="密码" size="large"/>
          <div class="login-ctrl">
            <Checkbox size="large">自动登录</Checkbox>
            <span>忘记密码</span>
          </div>
          <Button type="primary" size="large">登录</Button>
          <div class="login-ctrl">
            <span>其他登录方式</span>
            <router-link to="/signup">注册用户</router-link>
          </div>
        </TabPane>
        <TabPane label="手机登录">
          <Input placeholder="手机号" size="large"/>
          <div class="certificate">
            <Input id="inp" placeholder="验证码" size="large"/>
            <div class="space"></div>
            <Button id="get-cert" size="large">获取验证码</Button>
          </div>
          <Button type="primary" size="large">登录</Button>
          <div class="login-ctrl">
            <span>其他登录方式</span>
            <router-link to="/signup">注册用户</router-link>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'login'
})
export default class Login extends Vue {

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

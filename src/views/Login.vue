<template>
  <div id="login-view">
    <div id="login-card">
      <h1>Surplus 有余</h1>
      <p>一个面向大学生的专业“众包”系统</p>
      <Tabs>
        <TabPane label="账号密码登录">
          <Input placeholder="账号"/>
          <Input placeholder="密码"/>
          <div class="login-ctrl">
            <Checkbox>自动登录</Checkbox>
            <span>忘记密码</span>
          </div>
          <Button style="width: 100%" type="primary">登录</Button>
          <div class="login-ctrl">
            <span>其他登录方式</span>
            <span>注册账户</span>
          </div>
        </TabPane>
        <TabPane label="手机登录">
          <Input placeholder="手机号"/>
          <div class="certificate">
            <Input placeholder="验证码" id="inp"/>
            <Button id="get-cert">获取验证码</Button>
          </div>
          <Button style="width: 100%" type="primary">登录</Button>
          <div class="login-ctrl">
            <span>其他登录方式</span>
            <span>注册账户</span>
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
  align-items: center;
  justify-content: center;
  #login-card {
    width: 30%;
  }
  .ivu-input-wrapper {
    width: 100%;
  }
  .login-ctrl {
    display: flex;
    justify-content: space-between;
  }
  .certificate {
    display: flex;
    justify-content: space-between;
    #inp {
      flex: 5;
    }
    #get-cert {
      flex: 3;
    }
  }
}
</style>

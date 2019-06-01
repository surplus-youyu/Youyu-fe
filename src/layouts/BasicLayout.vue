<template>
    <div id="basic-layout">
      <Layout id="slider">
        <Sider style="width: 214px;min-width: 214px;max-width: 214px;flex: 0 0 214px;">
          <div class="logo">
            <router-link to="/" style="color: white;"><span>Surplus</span></router-link>
            <h1 style="color: white">有余</h1>
          </div>
          <Menu active-name="1" theme="dark" width="auto" @on-select="handleClick">
            <MenuItem name="requestHall">
                <Icon type="logo-dropbox" size="16"/>
                <span>请求大厅</span>
            </MenuItem>
            <MenuItem name="personalCenter" v-if="loginStatus">
                <Icon type="md-person" size="16"/>
                <span>个人中心</span>
            </MenuItem>
            <Submenu name="orderCenter" v-if="loginStatus">
              <template slot="title">
                  <div class="submenu-title">
                    <Icon type="md-reorder" size="16"/>
                    <span>我的订单</span> 
                  </div>
              </template>
              <MenuItem name="orders-sent">我发出的请求</MenuItem>
              <MenuItem name="orders-received">我接受的请求</MenuItem>
              <MenuItem name="orders-done">已完成的请求</MenuItem>
              <MenuItem name="orders-draft">未发送请求</MenuItem>
            </Submenu>
            <MenuItem name="publish" v-if="loginStatus">
                <Icon type="md-add" size="16"/>
                <span>发布请求</span>
            </MenuItem>
            <MenuItem name="about">
                <Icon type="ios-information-circle-outline" size="16"/>
                <span>有余简介</span>
            </MenuItem>
          </Menu>
        </Sider>
      <Layout>
          <Header id="header">
            <Button v-if="!loginStatus" icon="md-person" class="login-button" type="primary" @click="login">登录</Button>
            <div class="user-info" v-else>
              <Dropdown>
                  <img class="user-avatar" :src="userAvatar" />
                <DropdownMenu slot="list">
                  <DropdownItem name="personalCenter" @click="handleClick">个人中心</DropdownItem>
                  <DropdownItem @click="logOut">退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <span class="user-name" >{{userName}}</span>
            </div>
          </Header>
          <Content id="content">
              <Card>
                  <router-view></router-view>
              </Card>
          </Content>
      </Layout>
    </Layout>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IS_LOGIN, CURRENT_USER_INFO } from '@/stores/modules/user/constants';
import { IUserInfo } from '@/stores/modules/user/typing';
import DefaultAvatar from '@/assets/user/default-avatar.png';
import store from '@/stores';

@Component({
  name: 'BasicLayout',
  beforeRouteEnter(from: any, to: any, next: any) {
    const isLogin = store.getters[`user/${IS_LOGIN}`];
    let user: IUserInfo;
    if (isLogin) {
      user = store.getters[`user/${CURRENT_USER_INFO}`];
    }
    next((vm: any) => {
      vm.loginStatus = isLogin;
      if (isLogin) {
        vm.userName = 'test' || user.nick_name || user.real_name;
        vm.userAvatar = DefaultAvatar || user.avatar || DefaultAvatar;
      }
    });
  }
})
export default class BasicLayout extends Vue {
  loginStatus = true;
  userName = '';
  userAvatar = DefaultAvatar;

  handleClick(name: any) {
    this.$router.push({ name });
  }

  login() {
    this.$router.push({ name: 'login' });
  }

  logOut() {
    this.$router.push({ name: 'login' });
  }

}
</script>

<style lang="less" scoped>

#basic-layout {
  .layout-con{
    height: 100%;
    width: 100%;
  }
  
  #slider {
    min-height: 100vh;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-family: Logo;
        font-size: 36px;
        padding-right: 4px;
      }

      h1 {
        font-size: 16px;
        padding-left: 4px;
      }
    }

    .ivu-menu-dark {
      .ivu-menu-item {
        display: flex;
        align-items: center;
      }
    }

    .submenu-title {
      .ivu-icon {
        margin-right: 6px;
      }
    }

    .menu-item {

      span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
      }

      i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
      }
    }

    .ivu-icon {
      padding-right: 6px;
    }

    #header {
      background-color: #fff;
      height: 55px;

      .login-button {
        margin-top: 12px;
        float: right;
      }

      .user-info {
        float: right;
        display: flex;
        align-items: center;

        .user-avatar {
          height: 50px;
          margin-right: 10px;
        }

        .user-name {
          font-size: 16px;
        }
      }
    }
  }

  #content {
    margin: 20px;
  }
}
</style>

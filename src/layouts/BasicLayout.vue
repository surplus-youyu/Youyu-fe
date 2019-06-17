<template>
    <div id="basic-layout">
      <Layout id="slider">
        <Sider :style="{position: 'fixed', minWidth: '214px', height: '100vh', left: 0, overflow: 'auto'}">
          <div class="logo">
            <div @click="ClickLogo" style="color: white;"><span>Surplus</span></div>
            <h1 style="color: white">有余</h1>
          </div>
          <Menu ref="leftMenu" theme="dark" width="auto" @on-select="handleClick">
            <MenuItem name="tasks">
                <Icon type="logo-dropbox" size="16"/>
                <span>请求大厅</span>
            </MenuItem>
            <MenuItem name="personalCenter" v-if="loginStatus">
                <Icon type="md-person" size="16"/>
                <span>个人中心</span>
            </MenuItem>
            <MenuItem name="assignments" v-if="loginStatus">
                <Icon type="md-person" size="16"/>
                <span>接受的请求</span>
            </MenuItem>
            <Submenu name="publish" v-if="loginStatus">
              <template slot="title">
                <div class="submenu-title">
                  <Icon type="md-add" size="16"/>
                  <span>发布请求</span>
                </div>
              </template>
              <MenuItem name="questionnaire">发布问卷</MenuItem>
              <MenuItem name="customtask">发布任务</MenuItem>
            </Submenu>
            <MenuItem name="about">
                <Icon type="ios-information-circle-outline" size="16"/>
                <span>有余简介</span>
            </MenuItem>
          </Menu>
        </Sider>
      <Layout :style="{marginLeft: '214px'}">
          <Header id="header">
            <Button v-if="!loginStatus" icon="md-person" class="login-button" type="primary" @click="login">登录</Button>
            <div class="user-info" v-else>
              <Dropdown class="avatar-container" @on-click="drapDownClick">
                <div class="avatar-wrapper" style="height: 55px;">
                  <img class="user-avatar" :src="userAvatar" />
                </div>
                <DropdownMenu slot="list">
                  <DropdownItem name="personalCenter">个人中心</DropdownItem>
                  <DropdownItem name="logOut">退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Header>
          <Content id="content">
              <Card>
                  <router-view :key="key"></router-view>
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
  beforeRouteEnter(to: any, from: any, next: any) {
    const isLogin = store.getters[`user/${IS_LOGIN}`];
    let user: IUserInfo;
    if (isLogin) {
      user = store.getters[`user/${CURRENT_USER_INFO}`];
    }
    next((vm: any) => {
      vm.loginStatus = isLogin;
      if (isLogin) {
        vm.userName = user.nick_name || user.real_name;
        vm.userAvatar = DefaultAvatar;
      }
    });
  }
})
export default class BasicLayout extends Vue {
  loginStatus = true;
  userName = '';
  userAvatar = DefaultAvatar;

  handleClick(name: string) {
      this.$router.push({ name });
  }

  login() {
    this.$router.push({ name: 'login' });
  }

  logOut() {
    this.$router.push({ name: 'login' });
  }

  drapDownClick(name: string) {
    if (name === 'personalCenter') {
      const leftMenu: any = this.$refs.leftMenu;
      leftMenu.currentActiveName = 'personalCenter';
      this.handleClick(name);
    } else {
      // 去除用户信息
      this.logOut();
    }
  }

  ClickLogo() {
    const leftMenu: any = this.$refs.leftMenu;
    leftMenu.currentActiveName = 'tasks';
    this.handleClick('home');
  }


  get key() {
    return this.$route.path + Math.random();
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

        .avatar-wrapper {
          display: flex;
          align-items: center;
        }

        .user-avatar {
          height: 40px;
        }

        .user-name {
          font-size: 16px;
        }
        
        .avatar-container {
          height: 55px;
          .ivu-dropdown-rel {
            height: 55px !important;
          }
        }
      }
    }
  }

  #content {
    margin: 20px;
  }
}
</style>

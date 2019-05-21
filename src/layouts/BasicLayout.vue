<template>
    <div id="basic-layout">
      <Layout id="slider">
        <Sider>
          <div class="logo"> SurPlus 有余 </div>
          <Menu active-name="1" theme="dark" width="auto" @on-select="handleClick">
            <MenuItem name="requestHall">
                <Icon type="ios-navigate"></Icon>
                <span>请求大厅</span>
            </MenuItem>
            <MenuItem name="about">
                <Icon type="ios-navigate"></Icon>
                <span>有余简介</span>
            </MenuItem>
          </Menu>
        </Sider>
      <Layout>
          <Header id="header">
            <Button icon="md-person" class="login-button" type="primary" @click="login">登录</Button>
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

@Component({
  name: 'BasicLayout'
})
export default class BasicLayout extends Vue {

  handleClick(name: any) {
    this.$router.push({ name });
  }

  login() {
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
      height: 50px;
      font-size: 30px;
      color: white;
      text-align: center;
      border-bottom: 1px solid white;
    }

    .menu-item span{
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width .2s ease .2s;
    }

    .menu-item i{
      transform: translateX(0px);
      transition: font-size .2s ease, transform .2s ease;
      vertical-align: middle;
      font-size: 16px;
    }

    #header {
      background-color: #fff;

      .login-button {
        margin-top: 15px;
        float: right;
      }
    }
  }

  #content {
    margin: 20px;
  }
}
</style>

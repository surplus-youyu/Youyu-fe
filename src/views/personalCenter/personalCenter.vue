<template>
  <div>
    <h1 style="text-align: center; margin-top: 1rem; margin-bottom: 1rem;">个人中心</h1>
    <div class="info-wrapper">
      <div class="info" style="width: 40%; min-width: 500px;">
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">昵称</span>
          <Input 
            v-model="userInfo.nick_name"
            type="text"
            style="width: 80%"
            size="large"/>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">性别</span>
          <Select v-model="userInfo.gender" style="width:70px" size="large">
            <Option 
              v-for="item in genderList" 
              :value="item.value"
              :key="item.value">{{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem" size="large">余额</span>
          <Input 
            v-model="userInfo.balance" 
            prefix="logo-usd"
            style="width: 80%"
            size="large"
            disabled/>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">邮箱</span>
          <span>已绑定邮箱：{{ userInfo.email }}</span>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">密保手机</span>
          <span>已绑定手机：{{ phoneDisplay }}</span>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">个人简介</span>
          <Input 
            v-model="userInfo.description"
            type="textarea"
            :rows="6"
            style="width: 80%"
            size="large"/>
        </div>
      </div>
      <div class="avatar" style="margin: 1rem 0 0 0">
        <img 
          :src="userInfo.avatar || DefaultAvatar"
          alt="Avatar"
          style="width: 128px; border-radius: 50%; margin-bottom: 1rem">
        <Upload
          :before-upload="handleUpload"
          action="">
          <Button size="large">更换头像</Button>
        </Upload>
      </div>
    </div>
    <div class="submit-btn-wrapper">
      <Button type="primary" @click="updateInfo">更新信息</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '@/stores';
import DefaultAvatar from '@/assets/user/default-avatar.png';
import { UID, CURRENT_USER_INFO, MODIFY_USER_PROFILE } from '@/stores/modules/user/constants';
import { IUserInfo } from '@/stores/modules/user/typing';


@Component({
  name: 'personalCenter',
  beforeRouteEnter(to: any, from: any, next: any) {
    const data = store.getters[`user/${CURRENT_USER_INFO}`];
    if (data) {
      next((vm: any) => {
        vm.userInfo = Object.assign({}, data);
      });
    } else {
      next('/login');
    }
  }
})
export default class PersonalCenter extends Vue {
  userInfo: IUserInfo = {
    uid: 0,
    real_name: '',
    nick_name: '',
    avatar: '',
    age: 0,
    gender: 'm',
    balance: 0,
    major: '',
    grade: 0,
    phone: '',
    email: '',
    description: ''
  };

  DefaultAvatar = DefaultAvatar;

  genderMap = {
    m: '男',
    f: '女'
  };

  genderList = [
    {
      value: 'm',
      label: '男'
    },
    {
      value: 'f',
      label: '女'
    }
  ];

  get phoneDisplay() {
    return this.userInfo.phone.slice(0, 3) + '****' + this.userInfo.phone.slice(7);
  }

  handleUpload() {
    return false;
  }

  async updateInfo() {
    const result = await this.$store.dispatch(`user/${MODIFY_USER_PROFILE}`, this.userInfo);
    if (result.status) {
      this.$Message.success('更新成功');
    } else {
      this.$Message.error('更新失败，请稍候重试');
    }
  }
}
</script>

<style lang="less" scoped>
.info-wrapper {
  display: flex;
  justify-content: center;
}

.detail-wrapper {
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 0;
  
  .sub-title {
    font-weight: bold;
  }
}

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit-btn-wrapper {
  margin: 1rem 0 0 0;
  display: flex;
  justify-content: flex-end;
}
</style>

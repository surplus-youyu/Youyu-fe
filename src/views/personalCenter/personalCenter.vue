<template>
  <div>
    <h1 style="text-align: center; margin-top: 1rem; margin-bottom: 1rem;">个人中心</h1>
    <div class="info-wrapper">
      <div class="info" style="width: 40%; min-width: 500px;">
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">性别</span>
          <Select v-model="userInfo.gender" style="width:78px" size="large">
            <Option 
              v-for="item in genderList" 
              :value="item.value"
              :key="item.value">{{ item.label }}
            </Option>
          </Select>
        </div>
        <div style="display: flex; width:80%">
          <div class="detail-wrapper" style="width:30%">
            <span class="sub-title" style="margin-bottom: 1rem">年龄</span>
            <InputNumber size="large" :max="130" :min="0" v-model="userInfo.age"></InputNumber>
          </div>
          <div class="detail-wrapper" style="width:70%">
            <span class="sub-title" style="margin-bottom: 1rem">年级</span>
            <Select v-model="userInfo.grade" size="large">
              <Option 
                v-for="item in gradeList" 
                :value="item.value"
                :key="item.value">{{ item.label }}
              </Option>
            </Select>
          </div>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">专业</span>
          <Input 
            v-model="userInfo.major"
            type="text"
            style="width: 80%"
            size="large"/>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">昵称</span>
          <Input 
            v-model="userInfo.nickname"
            type="text"
            style="width: 80%"
            size="large"/>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">修改密码</span>
          <Poptip trigger="focus" content="清空则不会修改密码" placement="top-start">
            <Input type="password" v-model="userInfo.password" size="large" clearable/>
          </Poptip>
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
          <span class="sub-title" style="margin-bottom: 1rem" size="large">余额</span>
          <Input 
            v-model="userInfo.balance" 
            prefix="logo-usd"
            style="width: 80%"
            size="large"
            disabled/>
        </div>
      </div>
      <div class="avatar" style="margin: 1rem 0 0 0">
        <img 
          ref="userAvatar"
          :src="avatar"
          alt="Avatar"
          style="width: 128px; height: 128px; border-radius: 50%; margin-bottom: 1rem">
        <Upload
          :action="uploadAvatarURL"
          name="avatar"
          :show-upload-list="false"
          :before-upload="handleUpload"
          :on-success="avatarUploadSuccess">
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
import { Component, Vue, Emit } from 'vue-property-decorator';
import store from '@/stores';
import DefaultAvatar from '@/assets/user/default-avatar.png';
import { UID, CURRENT_USER_INFO, MODIFY_USER_PROFILE } from '@/stores/modules/user/constants';
import { IUserInfo } from '@/stores/modules/user/typing';


@Component({
  name: 'personalCenter',
  async beforeRouteEnter(to: any, from: any, next: any) {
    const data = store.getters[`user/${CURRENT_USER_INFO}`];
    if (data) {
      next((vm: any) => {
        vm.userInfo = Object.assign({}, data);
        vm.avatar = `/api/user/${vm.userInfo.uid}/avatar`;
        vm.uploadAvatarURL = `/api/user/${vm.userInfo.uid}/avatar`;
      });
    } else {
      next('/login');
    }
  }
})
export default class PersonalCenter extends Vue {
  userInfo: IUserInfo = {
    uid: -1,
    nickname: '',
    age: 0,
    gender: 'm',
    balance: 0,
    phone: '',
    email: '',
    password: '',
    grade: '',
    major: ''
  };

  avatar = '';
  uploadAvatarURL = '/api/user/:uid/avatar';

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

  gradeList = [
    {
      value: '1',
      label: '大一'
    },
    {
      value: '2',
      label: '大二'
    },
    {
      value: '3',
      label: '大三'
    },
    {
      value: '4',
      label: '大四'
    }
  ];

  get phoneDisplay() {
    return this.userInfo.phone.slice(0, 3) + '****' + this.userInfo.phone.slice(7);
  }

  async handleUpload(file: any) {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isJPGorPNG) {
      this.$Message.error('请上传图片类型的文件');
      return false;
    }
    if (!isLt10M) {
      this.$Message.error('上传头像图片大小不能超过 10MB');
      return false;
    }
    return isJPGorPNG && isLt10M;
  }

  @Emit('updateAvatar')
  async avatarUploadSuccess() {
    const userAvatar: any = this.$refs.userAvatar;
    userAvatar.src = `/api/user/${this.userInfo.uid}/avatar?t=${Math.random()}`;
    this.$Message.success('更新成功');
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

<template>
  <div>
    <h1 style="text-align: center; margin-top: 1rem; margin-bottom: 1rem;">个人中心</h1>
    <div class="info-wrapper">
      <div class="info" style="width: 40%">
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">昵称</span>
          <Input 
            v-model="nickName"
            type="text"
            style="width: 80%"
            size="large"/>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">性别</span>
          <Select v-model="gender" style="width:60px" size="large">
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
            v-model="balance" 
            prefix="logo-yen"
            style="width: 80%"
            disabled/>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">邮箱</span>
          <span>已绑定邮箱：{{ email }}</span>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">密保手机</span>
          <span>已绑定手机：{{ phoneDisplay }}</span>
        </div>
        <div class="detail-wrapper">
          <span class="sub-title" style="margin-bottom: 1rem">个人简介</span>
          <Input 
            v-model="description"
            type="textarea"
            :rows="6"
            style="width: 80%"
            size="large"/>
        </div>
      </div>
      <div class="avatar" style="margin: 1rem 0 0 0">
        <img 
          src="@/assets/user/default-avatar.png" 
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
      <Button type="primary">更新信息</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'personalCenter'
})
export default class PersonalCenter extends Vue {
  nickName: string = '鸡你太美';
  gender: string = '女';
  email: string = 'nmsl@cxk.ikun';
  description: string = '大家好，我是练习两年半的偶像练习生：kunkun。我喜欢唱、跳、RAP、篮球。Music~';
  balance: number = 0.0;
  phone: string = '13812348293';

  genderList = [
    {
      value: '未知',
      label: '未知'
    },
    {
      value: '男',
      label: '男'
    },
    {
      value: '女',
      label: '女'
    }
  ];

  get phoneDisplay() {
    return this.phone.slice(0, 3) + '****' + this.phone.slice(7);
  }

  handleUpload() {
    return false;
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

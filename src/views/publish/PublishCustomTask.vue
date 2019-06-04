<template>
  <div class="publish-customtask">
    <h1>创建你的任务</h1>
    <div class="title-wrapper">
      <h3 style="margin-bottom: 1rem">标题</h3>
      <Input 
        v-model="taskTitle" type="text" 
        placeholder="请输入任务标题"
        style="width: 60%"
        size="large"/>
    </div>
    <div class="description-wrapper">
      <h3 style="margin-bottom: 1rem">描述</h3>
      <Input 
        v-model="taskDescription" 
        type="textarea" 
        :rows="6" 
        placeholder="请输入任务描述..." 
        style="width: 60%"/>
    </div>
    <div class="uploader-wrapper">
      <h3 style="margin-bottom: 1rem">附件</h3>
      <Upload
        :before-upload="handleUpload"
        multiple
        action=""
        type="drag"
        style="width: 60%">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽上传附件</p>
        </div>
      </Upload>
    </div>
    <div class="submit-btn-wrapper">
      <Button style="margin-right: 1rem;">重置</Button>
      <Button type="primary">提交</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionnaireContent, IQuestionnaire } from '@/typings/publish';
import { CURRENT_USER_INFO } from '../../stores/modules/user/constants';

@Component({
  name: 'publish-customtask'
})

export default class Publish extends Vue {
  taskTitle: string = '';
  taskDescription: string = '';
  file: any = null;

  handleUpload(file: any) {
    this.file = file;
    return false;
  }
}
</script>

<style lang="less" scoped>
.submit-btn-wrapper,
.title-wrapper,
.description-wrapper,
.uploader-wrapper
{
  margin: 1rem 0 0 0;
}

.submit-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
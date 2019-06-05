<template>
  <div class="publish-customtask">
    <h1 style="margin-top: 1rem; text-align: center;">创建你的任务</h1>
    <div class="title-wrapper">
      <h3 style="margin-bottom: 1rem">标题</h3>
      <Input 
        v-model="currentCustomTask.title" type="text" 
        placeholder="请输入任务标题"
        style="width: 55%"
        size="large"/>
    </div>
    <div class="description-wrapper">
      <h3 style="margin-bottom: 1rem">描述</h3>
      <Input 
        v-model="currentCustomTask.description" 
        type="textarea" 
        :rows="6" 
        placeholder="请输入任务描述..." 
        style="width: 55%"/>
    </div>
    <div class="payment-wrapper">
      <h3 style="margin-bottom: 1rem">报酬</h3>
      <Input 
        v-model="currentCustomTask.bounty" 
        prefix="logo-yen"
        style="width: 55%"
        size="large"/>
    </div>
    <div class="uploader-wrapper">
      <h3 style="margin-bottom: 1rem">附件</h3>
      <Upload
        :before-upload="handleUpload"
        multiple
        action=""
        type="drag"
        style="width: 55%">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽上传附件</p>
        </div>
      </Upload>
    </div>
    <div class="submit-btn-wrapper">
      <Button style="margin-right: 1rem;">重置</Button>
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionnaireContent, IQuestionnaire } from '@/typings/publish';
import { CURRENT_USER_INFO } from '../../stores/modules/user/constants';
import { POST_QUESTIONARE } from '@/stores/modules/questionnaire/constants';

@Component({
  name: 'publish-customtask'
})

export default class Publish extends Vue {
  taskTitle: string = '';
  taskDescription: string = '';
  taskPayment: number = 0;
  file: any = null;

  currentCustomTask: IQuestionnaire = {
    title: '',
    publisher_id: -1,
    summary: '',
    bounty: 0
  };

  handleUpload(file: any) {
    this.file = file;
    return false;
  }

  clear() {
    this.taskTitle = '';
    this.taskDescription = '';
    this.taskPayment = 0;
    this.file = null;
  }

  async submit() {
    if (this.taskTitle === '' || this.taskDescription === '') {
      this.$Notice.error({
        title: '标题和描述不能为空',
        duration: 2
      });
      return;
    }
    const result = await this.$store.dispatch(
      `questionnaire/${POST_QUESTIONARE}`, Object.freeze({
        title: this.taskTitle,
        summary: this.taskDescription,
        enclosure: this.file
      })
    );
    if (result === 'OK') {
        this.$Notice.success({
          title: '发布成功',
          duration: 2
        });
        this.clear();
      } else {
        this.$Notice.error({
          title: result,
          duration: 2
        });
      }
  }
}
</script>

<style lang="less" scoped>
.submit-btn-wrapper,
.title-wrapper,
.description-wrapper,
.payment-wrapper,
.uploader-wrapper
{
  margin: 1rem 0 0 0;
}

.title-wrapper, 
.description-wrapper,
.payment-wrapper,
.uploader-wrapper 
{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h3 {
    text-align: left;
    width: 55%;
  }
}

.submit-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
}
</style>
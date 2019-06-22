<template>
  <div class="publish-customtask">
    <h1 style="margin-top: 1rem; text-align: center; margin-bottom: 2rem;">创建你的任务</h1>
    <div class="title-wrapper">
      <h3 style="margin-bottom: 1rem">标题</h3>
      <Input 
        v-model="currentCustomTask.title" type="text" 
        placeholder="请输入任务标题"
        style="width: 45%; min-width: 400px; max-width: 500px"
        size="large"/>
    </div>
    <div class="description-wrapper">
      <h3 style="margin-bottom: 1rem">描述</h3>
      <Input 
        v-model="currentCustomTask.summary" 
        type="textarea" 
        :rows="4" 
        placeholder="请输入任务描述" 
        style="width: 45%; min-width: 400px; max-width: 500px"
        size="large"/>
    </div>
    <div style="display: flex; justify-content: space-between; width: 45%; min-width: 400px; max-width: 500px; margin: 0 auto;">
      <div class="bounty-wrapper" style="width: 70%">
        <h3 style="margin-bottom: 1rem">报酬</h3>
        <Input 
          v-model="currentCustomTask.bounty" 
          prefix="logo-usd"
          size="large"/>
      </div>
      <div class="limit-wrapper" style="width: 25%">
        <h3 style="margin-bottom: 1rem">人数限制</h3>
        <InputNumber style="width: 100%" size="large" :max="400" :min="1" v-model="currentCustomTask.limit"></InputNumber>
      </div>
    </div>
    <div class="uploader-wrapper">
      <h3 style="margin-bottom: 1rem">附件</h3>
      <Upload
        :before-upload="handleUpload"
        multiple
        action=""
        type="drag"
        style="width: 45%; min-width: 400px; max-width: 500px">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽上传附件</p>
        </div>
      </Upload>
    </div>
    <div class="submit-btn-wrapper" v-if="taskExisted">
      <Button style="margin-right: 1rem;" @click="showFinishDialog = true">结束任务</Button>
      <Button type="info" style="margin-right: 1rem;" @click="getTaskStatics">查看完成情况</Button>
      <Modal
        v-model="showFinishDialog"
        title="结束任务"
        @on-ok="finishTask">
        <p>确定结束任务吗？</p>
      </Modal>
    </div>
    <div class="submit-btn-wrapper" v-else>
      <Button style="margin-right: 1rem;" @click="clear">重置</Button>
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionnaireContent, IQuestionnaire } from '@/typings/publish';
import { CURRENT_USER_INFO } from '../../stores/modules/user/constants';
import {
  POST_QUESTIONARE,
  LOAD_QUESTIONARE_SUBMITS,
  QUESTIONARE_SUBMITS_EXIST
  } from '@/stores/modules/questionnaire/constants';
import { ITask } from '@/typings/task';
import { GET_ALL_TASKS_OWN, FINISH_TASK } from '@/stores/modules/task/constants';
import store from '@/stores';

@Component({
  name: 'publish-customtask'
})

export default class Publish extends Vue {
  taskTitle: string = '';
  taskDescription: string = '';
  taskPayment: number = 0;
  file: any = null;
  taskExisted = false;
  showFinishDialog = false;

  currentCustomTask: IQuestionnaire = {
    title: '',
    publisher_id: -1,
    summary: '',
    bounty: 0,
    type: 'TASK_TYPE_CUSTOM',
    limit: 1
  };

  async mounted() {
    if (this.$route.name === 'published-custom-task-detail') {
      let curTask;
      const allTasks: ITask[] = store.getters[`task/${GET_ALL_TASKS_OWN}`];
      const uid = this.$store.getters[`user/${CURRENT_USER_INFO}`].uid;
      allTasks.forEach((task) => {
        if (task.id === +this.$route.params.aid) {
          curTask = Object.assign({}, task);
          this.currentCustomTask = {
            title: curTask.title,
            summary: curTask.description,
            publisher_id: uid,
            bounty: curTask.reward,
            type: 'TASK_TYPE_CUSTOM',
            limit: curTask.limit
          };
          this.taskExisted = true;
        }
      });
    }
  }

  handleUpload(file: any) {
    this.file = file;
    return false;
  }

  clear() {
    this.currentCustomTask = {
      title: '',
      publisher_id: -1,
      summary: '',
      bounty: 0,
      type: 'TASK_TYPE_CUSTOM',
      limit: 1
    };
  }

  async submit() {
    if (this.currentCustomTask.title === '' || this.currentCustomTask.summary === '') {
      this.$Notice.error({
        title: '标题和描述不能为空',
        duration: 2
      });
      return;
    }
    const result = await this.$store.dispatch(
      `questionnaire/${POST_QUESTIONARE}`, Object.freeze({
        title: this.currentCustomTask.title,
        summary: this.currentCustomTask.summary,
        enclosure: this.file,
        limit: this.currentCustomTask.limit,
        type: 'TASK_TYPE_CUSTOM'
      })
    );
    if (result === 'OK') {
        this.$Notice.success({
          title: '发布成功',
          duration: 2
        });
        this.clear();
        this.$router.push({name: 'tasks'});
      } else {
        this.$Notice.error({
          title: result,
          duration: 2
        });
      }
  }

  async getTaskStatics() {
    await this.$store.dispatch(`questionnaire/${LOAD_QUESTIONARE_SUBMITS}`, this.$route.params.aid);
    if (this.$store.getters[`questionnaire/${QUESTIONARE_SUBMITS_EXIST}`]) {
      this.$router.push( {name: 'custom-task-statistics', params: {aid: this.$route.params.aid} });
    } else {
       this.$Notice.error({
        title: '暂时无人接受任务',
        duration: 2
      });
    }
  }

  async finishTask() {
    const result = await this.$store.dispatch(`task/${FINISH_TASK}`, this.$route.params.aid);
    if (result === 'OK') {
      this.$Notice.success({
        title: '操作成功'
      });
      this.$router.push({name: 'a-published'});
    } else {
      this.$Notice.error({
        title:  result && result.msg || 'fail'
      });
    }
  }
}
</script>

<style lang="less" scoped>
.submit-btn-wrapper,
.title-wrapper,
.description-wrapper,
.bounty-wrapper,
.uploader-wrapper
{
  margin: 1rem 0 0 0;
}

.title-wrapper, 
.description-wrapper,
.uploader-wrapper 
{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h3 {
    text-align: left;
    width: 45%;
    min-width: 400px;
    max-width: 500px;
  }
}

.submit-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}
</style>
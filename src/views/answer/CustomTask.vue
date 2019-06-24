<template>
  <div class="custom-task">
    <h1 style="margin-top: 1rem; margin-bottom: 1rem; text-align: center;">{{currentTask.title}}</h1>
    <div class="title-wrapper">
      <h3 style="margin: 1rem 0 1rem 0">任务描述</h3>
      <p style="width: 45%; min-width: 400px; max-width: 500px;">{{currentTask.description}}</p>
    </div>
    <div class="limit-wrapper">
      <h3 style="margin: 1rem 0 1rem 0">已认领</h3>
      <p style="width: 45%; min-width: 400px; max-width: 500px; text-align: left">{{currentTask.assigned}} / {{currentTask.limit}}</p>
    </div>
    <div class="title-wrapper">
      <h3 style="margin: 1rem 0 0 0">回答</h3>
      <Input
      :disabled="readonly"
      v-model="answer"
      type="textarea" 
      style="width: 45%; min-width: 400px; max-width: 500px; margin: 1rem auto;" 
      size="large" 
      :rows="4" placeholder="在这里写下你的答案"/>
    </div>
    <div class="file-wrapper"  v-if="currentTask.files && currentTask.files.length">
       <h3>附件</h3>  
      <div class="file-list" style="width: 45%; min-width: 400px; max-width: 500px; margin: 5px auto;">
      <div class="file-item" v-for="(item, index) in currentTask.files" :key="index">
        <a class="file-name" href="javascript:;" @click="download(item)">{{item}}</a>
      </div>
    </div>
    </div>
    
    <div v-if="!readonly" class="submit-btn-wrapper">
      <Button @click="submit">提交</Button>
    </div>
    <div v-else class="submit-btn-wrapper">
      <Button @click="acceptAndAnswer">接受并开始回答</Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ITask } from '@/typings/task';
import { LOAD_ALL_TASKS, GET_ALL_TASKS, LOAD_FILE } from '../../stores/modules/task/constants';
import {
  RECEIVE_QUESTIONARE
} from '@/stores/modules/questionnaire/constants';
import {
  LOAD_ALL_ASSIGNMENTS,
  GET_ALL_ASSIGNMENTS,
  SUBMIT_ASSIGNMENT_ANSWER
} from '../../stores/modules/assignment/constants';
import { IAssignment } from '../../typings/assignment';

@Component({
  name: 'custom-task'
})
export default class CustomTask extends Vue {
  get readonly() {
    return this.$route.name === 'view-custom-task';
  }

  answer: string = '';

  currentTask: ITask = {
    id: -1,
    creator: -1,
    title: '',
    description: '',
    type: 'TASK_TYPE_CUSTOM',
    content: '',
    reward: 0,
    created_at: '',
    assigned: 1,
    files: []
  };

  async acceptAndAnswer() {
    const result = await this.$store.dispatch(`questionnaire/${RECEIVE_QUESTIONARE}`, {
      task_id: this.$route.params.tid
    });
    if (!isNaN(Number(result))) {
      this.$router.push({
        name: 'answer-custom-task',
        params: { aid: result }
      });
    } else {
      this.$Notice.error({
        title: result.data.msg || 'fail'
      });
    }
  }

  async submit() {
    if (this.answer.length === 0) {
      this.$Notice.error({
        title: '答案不能为空'
      });
      return;
    }
    const result = await this.$store.dispatch(`assignment/${SUBMIT_ASSIGNMENT_ANSWER}`, {
      aid: this.$route.params.aid,
      payload: this.answer
    });
    if (result === 'OK') {
      this.$Notice.success({
        title: 'success'
      });
    } else {
      this.$Notice.error({
        title: result.data.msg || 'fail'
      });
    }
  }

  async mounted() {
    if (this.$route.name === 'view-custom-task') {
      await this.$store.dispatch(`task/${LOAD_ALL_TASKS}`);
      const allTasks: ITask[] = this.$store.getters[`task/${GET_ALL_TASKS}`];
      allTasks.forEach((task) => {
        if (String(task.id) === this.$route.params.tid) {
          this.currentTask = Object.assign({}, task);
          if (this.currentTask.files && typeof this.currentTask.files === 'string') {
            this.currentTask.files = this.currentTask.files.split('/');
            if (this.currentTask.files[this.currentTask.files.length - 1] === '') {
              this.currentTask.files.pop();
            }
          }
        }
      });
    } else {
      await this.$store.dispatch(`assignment/${LOAD_ALL_ASSIGNMENTS}`);
      const assignments: IAssignment[] = this.$store.getters[`assignment/${GET_ALL_ASSIGNMENTS}`];
      let sid = -1;
      assignments.forEach((assign) => {
        if (String(assign.id) === this.$route.params.aid) {
          sid = assign.task_id;
        }
      });
      const allTasks: ITask[] = this.$store.getters[`task/${GET_ALL_TASKS}`];
      allTasks.forEach((task) => {
        if (task.id === sid) {
          this.currentTask = Object.assign({}, task);
          if (this.currentTask.files && typeof this.currentTask.files === 'string') {
            this.currentTask.files = this.currentTask.files.split('/');
            if (this.currentTask.files[this.currentTask.files.length - 1] === '') {
              this.currentTask.files.pop();
            }
          }
        }
      });
    }
  }

  async download(filename: string) {
    const data = await this.$store.dispatch(`task/${LOAD_FILE}`, {
      id: this.currentTask.id,
      filename
    });
    const url = URL.createObjectURL(data);
    const a = document.createElement('a'); // 生成一个a元素
    a.style.display = 'none';
    a.href = url;
    a.setAttribute('download', filename);
    a.click();
  }
}
</script>
<style lang="less" scoped>
.limit-wrapper,
.title-wrapper,
.file-wrapper {
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
}
.file-item {
  min-width: 400px; 
  max-width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

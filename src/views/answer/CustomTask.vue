<template>
  <div class="custom-task" 
  style="display: flex; flex-direction: column; align-items: center;">
    <h1>{{currentTask.title}}</h1>
    <Input
    :disabled="true"
    type="textarea"
    :row="10"
    style="width: 45%; margin: 1rem 0 1rem 0;"
    :value="currentTask.description" /><br>
    <Input
    :disabled="readonly"
    v-model="answer"
    type="textarea" 
    style="width: 45%; margin: 0 0 1rem 0;" 
    size="large" 
    :rows="4" placeholder="在这里写下你的答案"/>
    <div class="btn-wrapper" style="width: 45%">
      <Button v-if="readonly" @click="acceptAndAnswer">接受并开始回答</Button>
      <Button v-else @click="submit">提交</Button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ITask } from '@/typings/task';
import { LOAD_ALL_TASKS, GET_ALL_TASKS } from '../../stores/modules/task/constants';
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
    created_at: ''
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
        }
      });
    }
  }
}
</script>

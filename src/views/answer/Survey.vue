<template>
  <div id="current-questionnaire">
    <h1>{{currentQuestionnaire.title}}</h1>
    <h3>{{currentQuestionnaire.summary}}</h3>
    <answer-sheet v-for="(content, idx) in currentQuestionnaire.content" ref="answer"
    :key="`content-questionnaire-${idx}`" :inputQuestion="content" :index="idx"
    :readonly="readonly"></answer-sheet>
    <Button v-if="!readonly" @click="submit">提交</Button>
    <Button v-else @click="acceptAndAnswer">接受并任务并开始填写</Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionnaire } from '../../typings/publish';
import AnswerSheet from '@/components/AnswerSheet.vue';
import {
  LOAD_QUESTIONARE,
  GET_CURRENT_QUESTIONARE,
  RECEIVE_QUESTIONARE
} from '@/stores/modules/questionnaire/constants';
import {
  LOAD_ALL_ASSIGNMENTS,
  GET_ALL_ASSIGNMENTS,
  SUBMIT_ASSIGNMENT_ANSWER
} from '../../stores/modules/assignment/constants';
import { IAssignment } from '../../typings/assignment';
import { ITask } from '../../typings/task';
import assignment from '../../stores/modules/assignment';

@Component({
  name: 'survey',
  components: {
    AnswerSheet
  },
  async beforeRouteUpdate(to: any, from: any, next: any) {
    if (this.$route.name === 'view-questionnaire' && to.params.sid !== from.params.sid) {
      await this.$store.dispatch(`questionnaire/${LOAD_QUESTIONARE}`, to.params.sid);
    }
    next();
  }
})
export default class Survey extends Vue {
  get readonly() {
    return this.$route.name === 'view-questionnaire';
  }
  currentQuestionnaire: IQuestionnaire = {
    title: '',
    publisher_id: -1,
    summary: '',
    bounty: 0,
    content: []
  };

  async submit() {
    const arr: AnswerSheet[] = (this.$refs.answer as AnswerSheet[]);
    let isValid: boolean = true;
    arr.forEach((component, idx) => {
      if (!component.validate()) {
        isValid = false;
      }
    });
    if (!isValid) {
      this.$Notice.error({
        title: '不满足问卷填写要求，无法提交',
        duration: 2
      });
    } else {
      const result = await this.$store.dispatch(`assignment/${SUBMIT_ASSIGNMENT_ANSWER}`, {
        aid: this.$route.params.sid,
        payload: this.currentQuestionnaire.content
      });
      if (result === 'OK') {
        this.$Notice.success({
          title: 'success'
        });
      } else {
        this.$Notice.error({
          title: 'fail'
        });
      }
    }
  }

  async mounted() {
    if (this.$route.name === 'view-questionnaire') {
      await this.$store.dispatch(`questionnaire/${LOAD_QUESTIONARE}`, this.$route.params.sid);
      this.currentQuestionnaire = this.$store.getters[`questionnaire/${GET_CURRENT_QUESTIONARE}`];
    } else {
      await this.$store.dispatch(`assignment/${LOAD_ALL_ASSIGNMENTS}`);
      const assignments: IAssignment[] = this.$store.getters[`assignment/${GET_ALL_ASSIGNMENTS}`];
      let sid = -1;
      assignments.forEach((assign) => {
        if (String(assign.id) === this.$route.params.aid) {
          sid = assign.task_id;
        }
      });
      await this.$store.dispatch(`questionnaire/${LOAD_QUESTIONARE}`, sid);
      this.currentQuestionnaire = this.$store.getters[`questionnaire/${GET_CURRENT_QUESTIONARE}`];
    }
  }

  async acceptAndAnswer() {
    const result = await this.$store.dispatch(`questionnaire/${RECEIVE_QUESTIONARE}`, {
      task_id: this.$route.params.sid
    });
    if (!isNaN(Number(result))) {
      this.$router.push({
        name: 'answer-questionnaire',
        params: { aid: result }
      });
    } else {
      this.$Notice.error({
        title: 'fail'
      });
    }
  }
}
</script>

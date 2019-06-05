<template>
  <div id="current-questionnaire">
    <answer-sheet v-for="(content, idx) in currentQuestionnaire.content" ref="answer"
    :key="`content-questionnaire-${idx}`" :inputQuestion="content" :index="idx"></answer-sheet>
    <Button @click="submit">提交</Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionnaire } from '../../typings/publish';
import AnswerSheet from '@/components/AnswerSheet.vue';
import { LOAD_QUESTIONARE, GET_CURRENT_QUESTIONARE } from '@/stores/modules/questionnaire/constants';

@Component({
  name: 'survey',
  components: {
    AnswerSheet
  },
  async beforeRouteUpdate(to: any, from: any, next: any) {
    if (to.params.sid !== from.params.sid) {
      await this.$store.dispatch(`questionnaire/${LOAD_QUESTIONARE}`, to.params.sid);
    }
    next();
  }
})
export default class Survey extends Vue {
  currentQuestionnaire: IQuestionnaire = {
    title: '',
    publisher_id: -1,
    summary: '',
    bounty: 0,
    content: []
  };

  submit() {
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
    }
  }

  async mounted() {
    await this.$store.dispatch(`questionnaire/${LOAD_QUESTIONARE}`, this.$route.params.sid);
    this.currentQuestionnaire = this.$store.getters[`questionnaire/${GET_CURRENT_QUESTIONARE}`];
  }
}
</script>

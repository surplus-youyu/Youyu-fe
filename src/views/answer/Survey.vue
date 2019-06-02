<template>
  <div id="current-questionare">
    <answer-sheet v-for="(content, idx) in currentQuestionare.content" ref="answer"
    :key="`content-questionare-${idx}`" :inputQuestion="content" :index="idx"></answer-sheet>
    <Button @click="submit">提交</Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionare } from '../../typings/publish';
import AnswerSheet from '@/components/AnswerSheet.vue';

@Component({
  name: 'survey',
  components: {
    AnswerSheet
  }
})
export default class Survey extends Vue {
  currentQuestionare: IQuestionare = {
    title: 'a questionare',
    publisher_id: -1,
    bounty: 10,
    content: [
      {
        title: 'question 1',
        type: 1,
        options: ['o1', 'o2', 'o3'],
        optional: true,
        limit: 1
      },
      {
        title: 'question 2',
        type: 2,
        options: ['p1', 'p2', 'p3'],
        optional: true,
        limit: 2
      },
      {
        title: 'question 3',
        type: 3,
        options: [],
        optional: true,
        limit: -1
      }
    ]
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
}
</script>

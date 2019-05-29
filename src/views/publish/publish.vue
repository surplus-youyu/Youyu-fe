<template>
  <question-creater/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionareContent } from '@/typings/publish';
import QuestionCreater from '@/components/QuestionCreater.vue';

@Component({
  name: 'publish',
  components: {
    QuestionCreater
  }
})
export default class Publish extends Vue {
}
</script>


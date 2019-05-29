<template>
  <div>
    <Modal v-model="showCreaterDialog" :footer-hide="true">
      <question-creater/>
    </Modal>
    <Button @click="createQuestion">创建问题</Button>
  </div>
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
  showCreaterDialog: boolean = false;

  createQuestion() {
    this.showCreaterDialog = true;
  }
}
</script>


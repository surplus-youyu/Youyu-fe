<template>
  <div class="publish-questionare">
    <Modal v-model="showCreaterDialog" :footer-hide="true">
      <question-form
      @createNewQuestion="newQuestionHandler"
      :inputContent="plainContent"
      mode="create"/>
    </Modal>
    <div style="position: fixed; bottom: 10vh; z-index: 100;" >
      <Button type="primary" icon="md-add" shape="circle" @click="createQuestion" size="large"></Button>
    </div>
    <h1 style="margin-bottom: 1rem;">创建你的问卷</h1>
    <div class="title-wrapper">
      <h3 style="margin-bottom: 1rem">标题</h3>
      <Input 
        type="text" 
        placeholder="输入问卷标题" 
        style="width: 60%;"
        v-model="currentQuestionare.title"/>
    </div>
    <div class="questions-wrapper">
      <h3 v-if="currentQuestionare.content.length === 0" 
        style="text-align: center; height: 200px; line-height: 200px;
        vertical-align: middle; width: 60%;">
        你的问卷还没有任何问题哦，点击左下方的“+”按钮创建吧！
      </h3>
      <h3 v-else>问题</h3>
      <Card :dis-hover="true" style="margin: 1rem 0 0 0; width: 60%" 
        v-for="(content, idx) in currentQuestionare.content" :key="'content' + idx">
        <question-form 
        :inputContent="content"
        @modifyQuestion="modifyQuestionHandler"
        mode="edit"
        :index="idx"/> 
      </Card>
    </div>
    
    <div class="submit-btn-wrapper">
      <Button style="margin-right: 1rem;">重置</Button>
      <Button type="primary" >提交</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionareContent, IQuestionare } from '@/typings/publish';
import QuestionForm from '@/components/QuestionForm.vue';
import { CURRENT_USER_INFO } from '../../stores/modules/user/constants';

@Component({
  name: 'publish-questionare',
  components: {
    QuestionForm
  }
})
export default class Publish extends Vue {
  showCreaterDialog: boolean = false;

  plainContent: IQuestionareContent = {
    title: '',
    type: 1,
    options: [],
    optional: true,
    limit: 1
  };

  currentQuestionare: IQuestionare = {
    title: '',
    publisher_id: -1,
    content: []
  };

  newQuestionHandler(content: IQuestionareContent) {
    this.showCreaterDialog = false;
    this.currentQuestionare.content.push(content);
  }

  modifyQuestionHandler(content: IQuestionareContent, index: number) {
    this.currentQuestionare.content[index] = content;
  }

  createQuestion() {
    this.showCreaterDialog = true;
  }

  mounted() {
    if (this.$store.getters[`user/${CURRENT_USER_INFO}`] !== null) {
      this.currentQuestionare.publisher_id = this.$store.getters[`user/${CURRENT_USER_INFO}`].uid;
    }
  }
}
</script>
<style lang="less">
.submit-btn-wrapper,
.questions-wrapper 
{
  margin: 1rem 0 0 0;
}

.submit-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>


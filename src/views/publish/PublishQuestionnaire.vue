<template>
  <div class="publish-questionnaire">
    <Modal v-model="showCreaterDialog" :footer-hide="true">
      <question-form
      @createNewQuestion="newQuestionHandler"
      :inputContent="plainContent"
      mode="create"/>
    </Modal>
    <div style="position: fixed; bottom: 10vh; z-index: 100;" >
      <Button type="primary" icon="md-add" shape="circle" @click="createQuestion" size="large"></Button>
    </div>
    <h1 style="margin-top: 1rem; margin-bottom: 2rem; text-align: center;">创建你的问卷</h1>
    <div class="title-wrapper">
      <h3 style="margin-bottom: 1rem">标题</h3>
      <Input 
        type="text"
        placeholder="请输入问卷标题..." 
        style="width: 45%;"
        v-model="currentQuestionnaire.title"
        size="large"/>
      <h3 style="margin: 1rem 0 1rem 0">描述</h3>
      <Input
        type="textarea"
        :rows="4"
        placeholder="请输入问卷描述"
        style="width: 45%"
        v-model="currentQuestionnaire.summary"/>
    </div>
    <div class="bounty-wrapper">
      <h3 style="margin-bottom: 1rem">报酬</h3>
      <Input 
        v-model="currentQuestionnaire.bounty" 
        prefix="logo-yen"
        style="width: 45%"
        size="large"/>
    </div>
    <div class="questions-wrapper">
      <h3 v-if="currentQuestionnaire.content.length === 0" 
        style="text-align: center; height: 180px; line-height: 180px;
        vertical-align: middle;">
        你的问卷还没有任何问题哦，点击左下方的“+”按钮创建吧！
      </h3>
      <h3 v-else>问题</h3>
      <Card :dis-hover="true" style="margin: 1rem 0 0 0; width: 45%" 
        v-for="(content, idx) in currentQuestionnaire.content" :key="'content' + idx">
        <question-form 
        :inputContent="content"
        @modifyQuestion="modifyQuestionHandler"
        mode="edit"
        :index="idx"/> 
      </Card>
    </div>
    
    <div class="submit-btn-wrapper">
      <Button style="margin-right: 1rem;">重置</Button>
      <Button type="primary" @click="createQuestionnaire">提交</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionnaireContent, IQuestionnaire } from '@/typings/publish';
import QuestionForm from '@/components/QuestionForm.vue';
import { CURRENT_USER_INFO } from '../../stores/modules/user/constants';
import { POST_QUESTIONARE } from '../../stores/modules/questionnaire/constants';

@Component({
  name: 'publish-questionnaire',
  components: {
    QuestionForm
  }
})
export default class Publish extends Vue {
  showCreaterDialog: boolean = false;

  plainContent: IQuestionnaireContent = {
    title: '',
    type: 1,
    options: [],
    optional: true,
    limit: 1
  };

  currentQuestionnaire: IQuestionnaire = {
    title: '',
    publisher_id: -1,
    summary: '',
    bounty: 0,
    content: []
  };

  newQuestionHandler(content: IQuestionnaireContent) {
    this.showCreaterDialog = false;
    if (this.currentQuestionnaire.content) {
      this.currentQuestionnaire.content.push(content);
    }
  }

  modifyQuestionHandler(content: IQuestionnaireContent, index: number) {
    if (this.currentQuestionnaire.content) {
      this.currentQuestionnaire.content[index] = content;
    }
  }

  createQuestion() {
    this.showCreaterDialog = true;
  }

  async createQuestionnaire() {
    if (this.currentQuestionnaire.title.length === 0) {
      this.$Notice.error({
        title: '标题不能为空',
        duration: 2
      });
      return;
    } else if (this.currentQuestionnaire.summary.length === 0) {
      this.$Notice.error({
        title: '描述不能为空',
        duration: 2
      });
      return;
    } else if (this.currentQuestionnaire.content && this.currentQuestionnaire.content.length === 0) {
      this.$Notice.error({
        title: '题目不能为空',
        duration: 2
      });
      return;
    } else {
      const result = await this.$store.dispatch(`questionnaire/${POST_QUESTIONARE}`,
        Object.freeze(this.currentQuestionnaire));
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

  clear() {
    this.currentQuestionnaire = {
      title: '',
      publisher_id: -1,
      summary: '',
      bounty: 0,
      content: []
    };
  }

  mounted() {
    if (this.$store.getters[`user/${CURRENT_USER_INFO}`] !== null) {
      this.currentQuestionnaire.publisher_id = this.$store.getters[`user/${CURRENT_USER_INFO}`].uid;
    }
  }
}
</script>
<style lang="less">
.submit-btn-wrapper,
.questions-wrapper,
.bounty-wrapper
{
  margin: 1rem 0 0 0;
}

.title-wrapper, 
.description-wrapper,
.bounty-wrapper, 
.uploader-wrapper, 
.questions-wrapper 
{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h3 {
    text-align: left;
    width: 45%;
  }
}

.submit-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>


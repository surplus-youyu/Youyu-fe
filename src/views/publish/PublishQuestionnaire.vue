<template>
  <div class="publish-questionnaire">
    <Modal v-model="showCreaterDialog" :footer-hide="true">
      <question-form
      @createNewQuestion="newQuestionHandler"
      :inputContent="plainContent"
      mode="create"/>
    </Modal>
    <div style="position: fixed; bottom: 4vh; z-index: 100;" >
      <Button type="primary" icon="md-add" shape="circle" @click="createQuestion" size="large"></Button>
    </div>
    <h1 style="margin-top: 1rem; margin-bottom: 2rem; text-align: center;">创建你的问卷</h1>
    <div class="title-wrapper">
      <h3 style="margin-bottom: 1rem">标题</h3>
      <Input 
        type="text"
        placeholder="请输入问卷标题" 
        style="width: 45%; min-width: 400px; max-width: 500px;"
        v-model="currentQuestionnaire.title"
        size="large"/>
      <h3 style="margin: 1rem 0 1rem 0">描述</h3>
      <Input
        type="textarea"
        :rows="4"
        placeholder="请输入问卷描述"
        style="width: 45%; min-width: 400px; max-width: 500px;"
        v-model="currentQuestionnaire.summary"/>
    </div>
    <div style="display: flex; justify-content: space-between; width: 45%; min-width: 400px; max-width: 500px; margin: 0 auto;">
      <div class="bounty-wrapper" style="width: 70%">
        <h3 style="margin-bottom: 1rem">报酬</h3>
        <Input 
          v-model="currentQuestionnaire.bounty" 
          prefix="logo-usd"
          size="large"/>
      </div>
      <div class="limit-wrapper" style="width: 25%">
        <h3 style="margin-bottom: 1rem">人数限制</h3>
        <InputNumber style="width: 100%" size="large" :max="400" :min="1" v-model="currentQuestionnaire.limit"></InputNumber>
      </div>
    </div>
    <div class="questions-wrapper">
      <h3 v-if="currentQuestionnaire.content.length === 0" 
        style="text-align: center; height: 180px; line-height: 180px;
        vertical-align: middle;">
        你的问卷还没有任何问题哦，点击左下方的“+”按钮创建吧！
      </h3>
      <h3 v-else>问题</h3>
      <Card :dis-hover="true" style="margin: 1rem 0 0 0; width: 45%; min-width: 400px; max-width: 500px;" 
        v-for="(content, idx) in currentQuestionnaire.content" :key="'content' + idx + Math.random()">
        <div style="width: 100%; display: flex; justify-content: flex-end;">
          <Button type="text" icon="md-close" @click="delQuestion(idx)" style="padding: 0"></Button>
        </div>
        <question-form 
        :inputContent="content"
        @modifyQuestion="modifyQuestionHandler"
        mode="edit"
        :index="idx"/> 
      </Card>
    </div>
    <div class="submit-btn-wrapper" v-if="questionnaireExisted">
      <Button style="margin-right: 1rem;" @click="showFinishDialog = true">结束任务</Button>
      <Button type="info" style="margin-right: 1rem;" @click="getQNaireStatics">查看填写情况</Button>
      <Modal
        v-model="showFinishDialog"
        title="结束任务"
        @on-ok="finishTask">
        <p>确定结束任务吗？</p>
      </Modal>
    </div>
    <div class="submit-btn-wrapper" v-else>
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
import {
  POST_QUESTIONARE,
  LOAD_QUESTIONARE_SUBMITS,
  QUESTIONARE_SUBMITS_EXIST
} from '../../stores/modules/questionnaire/constants';
import { ITask } from '@/typings/task';
import { GET_ALL_TASKS_OWN, FINISH_TASK } from '@/stores/modules/task/constants';
import {
  LOAD_QUESTIONARE,
  GET_CURRENT_QUESTIONARE,
  RECEIVE_QUESTIONARE
} from '@/stores/modules/questionnaire/constants';
import store from '@/stores';

@Component({
  name: 'publish-questionnaire',
  components: {
    QuestionForm
  }
})
export default class Publish extends Vue {
  showCreaterDialog: boolean = false;
  showFinishDialog = false;
  questionnaireExisted = false;

  plainContent: IQuestionnaireContent = {
    title: '',
    type: 1,
    options: [],
    optional: true,
    limit: 1,
    answer: []
  };

  currentQuestionnaire: IQuestionnaire = {
    title: '',
    publisher_id: -1,
    summary: '',
    bounty: 0,
    content: [],
    type: 'TASK_TYPE_SURVEY',
    limit: 1
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
       Object.freeze({
        title: this.currentQuestionnaire.title,
        summary: this.currentQuestionnaire.summary,
        limit: this.currentQuestionnaire.limit,
        type: this.currentQuestionnaire.type,
        content: this.currentQuestionnaire.content,
        reward: this.currentQuestionnaire.bounty
      }));
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
  }

  delQuestion(index: number) {
    if (this.currentQuestionnaire.content) {
      this.currentQuestionnaire.content.splice(index, 1);
    }
  }

  clear() {
    this.currentQuestionnaire = {
      title: '',
      publisher_id: -1,
      summary: '',
      bounty: 0,
      content: [],
      type: 'TASK_TYPE_SURVEY',
      limit: 1
    };
  }

  async mounted() {
    let uid = -1;
    if (this.$store.getters[`user/${CURRENT_USER_INFO}`] !== null) {
      uid = this.currentQuestionnaire.publisher_id = this.$store.getters[`user/${CURRENT_USER_INFO}`].uid;
    }
    if (this.$route.name === 'published-questionnaire-detail') {
      await this.$store.dispatch(`questionnaire/${LOAD_QUESTIONARE}`, this.$route.params.aid);
      this.currentQuestionnaire = this.$store.getters[`questionnaire/${GET_CURRENT_QUESTIONARE}`];
      this.questionnaireExisted = true;
    }
  }

  async getQNaireStatics() {
    await this.$store.dispatch(`questionnaire/${LOAD_QUESTIONARE_SUBMITS}`, this.$route.params.aid);
    if (this.$store.getters[`questionnaire/${QUESTIONARE_SUBMITS_EXIST}`]) {
      this.$router.push( {name: 'questionnaire-statistics', params: {aid: this.$route.params.aid} });
    } else {
       this.$Notice.error({
        title: '暂时无人填写问卷',
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
.questions-wrapper,
.limit-wrapper,
.bounty-wrapper
{
  margin: 1rem 0 0 0;
}

.title-wrapper, 
.description-wrapper,
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
    min-width: 400px; 
    max-width: 500px;
  }
}

.submit-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>


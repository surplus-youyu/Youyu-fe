<template>
<div>
  <Table class="statistics-list"
    stripe 
    :columns="TableColumns" 
    :data="submitList"
    @on-row-click="getSubmitDetail"></Table>
  <Modal
      v-model="showSubmitDetail"
      :title="isQuestionnaire ? '问卷详情': '任务详情'"
      ok-text="审核通过"
      :cancel-text="isQuestionnaire ? '问卷无效': '任务无效'"
      @on-ok="questionnairePass(true)"
      @on-cancel="questionnairePass(false)"
      >
      <div v-if="isQuestionnaire">
        {{isQuestionnaire}}
        <div class="content" v-for="(content, index) in TaskDetail.content" :key="index">
          <p class="content-title">题目{{index + 1}}: {{content.title}}</p>
          <p class="content-answer">答案: <span v-for="(item, index) in content.answer" :key="index">{{item}}{{index < content.answer.length - 1 ? ', ': ''}}</span></p>
        </div>
      </div>
      <p v-else class="content-answer">答案: {{TaskDetail.content}}</p>
  </Modal>
</div>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionnaire, IQuestionnaireContent } from '@/typings/publish';
import { GET_QUESTIONARE_SUBMITS, JUDGE_QUESTIONARE_SUBMIT } from '@/stores/modules/questionnaire/constants';
import { IAssignmentFeedback } from '@/typings/assignment';
import { ASSIGNMENT_STATUS_MAP } from '@/views/assignments/constants';

@Component({
  name: 'taskStatistics'
})
export default class TaskStatistics extends Vue {

  submitList: IAssignmentFeedback[] = [];
  showSubmitDetail = false;
  isQuestionnaire = false;

  TaskDetail: IAssignmentFeedback = {
    id: -1,
    content: [],
    status: '',
    task_id: -1,
    created_at: '',
    updated_at: ''
  };

  TableColumns = [
    {
      type: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '状态',
      key: 'status',
      align: 'center'
    },
    {
      title: '创建日期',
      key: 'created_at',
      align: 'center'
    }
  ];

  mounted() {
    const data = this.$store.getters[`questionnaire/${GET_QUESTIONARE_SUBMITS}`];
    this.submitList = JSON.parse(JSON.stringify(data));
    this.submitList.forEach((item) => {
      item.created_at = item.created_at.split('Z')[0].replace('T', ' ');
      item.status = ASSIGNMENT_STATUS_MAP[item.status];
      if (this.$route.name === 'questionnaire-statistics') {
        this.isQuestionnaire = true;
        item.content = (JSON.parse(item.content + '') as IQuestionnaireContent[]);
      }
    });
  }

  getSubmitDetail(questionnaire: IAssignmentFeedback) {
    this.TaskDetail = questionnaire;
    this.showSubmitDetail = true;
  }

  async questionnairePass(status: boolean) {
    const result = await this.$store.dispatch(`questionnaire/${JUDGE_QUESTIONARE_SUBMIT}`, {
      status,
      aid: this.TaskDetail.id,
      task_id: this.TaskDetail.task_id
    });
    if (result === 'OK') {
      this.$Notice.success({
        title: '审核成功'
      });
      this.TaskDetail.status = status ? 'ASSIGNMENT_STATUS_SUCCESS' : 'ASSIGNMENT_STATUS_FAILED';
    } else {
      this.$Notice.error({
        title:  result && result.msg || 'fail'
      });
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  margin-bottom: 10px;
  .content-title {
    font-weight: bold;
    font-size: 16px;
  }
  .content-answer {
    font-size: 14px;
  }
}
</style>

<template>
<div>
  <Table class="statistics-list"
    stripe 
    :columns="TableColumns" 
    :data="submitList"
    @on-row-click="getSubmitDetail"></Table>
  <Modal
      v-model="showSubmitDetail"
      title="问卷详情"
      ok-text="审核通过"
      cancel-text="问卷无效"
      @on-ok="questionnairePass(true)"
      @on-cancel="questionnairePass(false)"
      >
      <div class="content" v-for="(content, index) in QuestionnaireDetail.content" :key="index">
        <p class="content-title">题目{{index + 1}}: {{content.title}}</p>
        <p class="content-answer">答案: <span v-for="(item, index) in content.answer" :key="index">{{item}}{{index < content.answer.length - 1 ? ', ': ''}}</span></p>
      </div>
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
  name: 'questionnaireStatistics'
})
export default class QuestionnaireStatistics extends Vue {

  submitList: IAssignmentFeedback[] = [];
  showSubmitDetail = false;
  QuestionnaireDetail: IAssignmentFeedback = {
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
    });
  }

  getSubmitDetail(questionnaire: IAssignmentFeedback) {
    this.QuestionnaireDetail = questionnaire;
    this.showSubmitDetail = true;
  }

  async questionnairePass(status: boolean) {
    const result = await this.$store.dispatch(`questionnaire/${JUDGE_QUESTIONARE_SUBMIT}`, {
      status,
      aid: this.QuestionnaireDetail.id,
      task_id: this.QuestionnaireDetail.task_id
    });
    if (result === 'OK') {
      this.$Notice.success({
        title: '审核成功'
      });
      this.QuestionnaireDetail.status = status ? 'ASSIGNMENT_STATUS_SUCCESS' : 'ASSIGNMENT_STATUS_FAILED';
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

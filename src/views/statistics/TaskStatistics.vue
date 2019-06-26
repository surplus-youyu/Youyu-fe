<template>
<div>
  <Table class="statistics-list"
    stripe 
    :columns="TableColumns" 
    :data="showPagesubmitList">
    <template slot-scope="{ row, index }" slot="action">
      <Button class="action" type="primary" size="small" @click="getSubmitDetail(index)">查看详情</Button>
      <Button class="action" type="error" size="small" @click="questionnairePass(index, false)" v-if="showPagesubmitList[index].status !== '审核通过'">审核失败</Button>
      <Button class="action" type="success" size="small" @click="questionnairePass(index, true)" v-if="showPagesubmitList[index].status !== '审核通过'">审核通过</Button>
    </template>
  </Table>
  <div class="btn-container">
    <Button 
      @click="overviewOfQuestionnaire" 
      v-if="isQuestionnaire"
      type="primary"
      style="margin-bottom: 1rem;">查看统计
    </Button>
    <Page class="page" :total="submitList.length" :page-size="pageSize" @on-change="pageChange"/>
  </div>
  <Modal
      v-model="showSubmitDetail"
      :title="isQuestionnaire ? '问卷详情': '任务详情'"
      >
      <div v-if="isQuestionnaire">
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
  currentPage = 1;
  pageSize = 10;

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
    },
    {
      title: '操作',
      key: 'action',
      slot: 'action',
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
  overviewOfQuestionnaire() {
    const taskId = this.$route.params.aid;
    this.$router.push({
      name: 'overview-of-statistic',
      params: {
        aid: String(taskId)
      }
    });
  }

  getSubmitDetail(index: number) {
    this.TaskDetail = this.showPagesubmitList[index];
    this.showSubmitDetail = true;
  }

  async questionnairePass(index: number, status: boolean) {
    const taskDetail = this.showPagesubmitList[index];
    const result = await this.$store.dispatch(`questionnaire/${JUDGE_QUESTIONARE_SUBMIT}`, {
      status,
      aid: taskDetail.id,
      task_id: taskDetail.task_id
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

  pageChange(page: number) {
    this.currentPage = page;
  }

  get showPagesubmitList(): IAssignmentFeedback[] {
    return this.submitList.filter(
      (item, index) => index / this.pageSize >= this.currentPage - 1 && index / this.pageSize < this.currentPage);
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

.action {
  margin-right: 10px;
}

.btn-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>

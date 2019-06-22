<template>
  <div>
    <div class="sort-group">
      <sort-button class="sort-btn" :reset="!sortBytime" title="时间" @status-change="selectTime"></sort-button>
      <sort-button class="sort-btn" :reset="sortBytime" title="价格" @status-change="selectBounty"></sort-button>
      <div class="select-container">
        <Select class="select" clearable @on-change="selecttype" placeholder="任务类型">
          <Option value="TASK_TYPE_SURVEY" key="TASK_TYPE_SURVEY">调查问卷</Option>
          <Option value="TASK_TYPE_CUSTOM" key="TASK_TYPE_CUSTOM">自定义任务</Option>
        </Select>
      </div>
      <Input class="search" type='text' @on-change="search" v-model="searchText" clearable placeholder="请输入搜索内容" suffix="ios-search"/>
    </div>
    <div class="cards-container">
      <request-card class="req-card" v-for="(task, index) in showPageTasks"
      :key="index" :req="task" @click="getTaskDetail(task)"></request-card>
    </div>
    <div class="page-container">
      <Page class="page" :total="showTasks.length" :page-size="pageSize" @on-change="pageChange"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SortButton from '@/components/SortButton.vue';
import RequestCard from '@/components/RequestCard.vue';
import { SortMap, RequsetMsg } from '@/typings/requestHall';
import store from '@/stores';
import { UID } from '@/stores/modules/user/constants';
import { GET_ALL_TASKS, LOAD_ALL_TASKS } from '../../stores/modules/task/constants';
import { ITask } from '@/typings/task';
import { LOAD_ALL_ASSIGNMENTS, GET_ALL_ASSIGNMENTS } from '../../stores/modules/assignment/constants';
import { IAssignment } from '../../typings/assignment';

@Component({
  name: 'requestHall',
  components: {
    SortButton,
    RequestCard
  }
})
export default class RequestHall extends Vue {

  sortMap: SortMap = {
    time: 0,
    bounty: 0,
    type: ''
  };

  sortBytime = false;
  searchText = '';
  currentPage = 1;
  pageSize = 9;

  allTasks: ITask[] = [];
  showTasks: ITask[] = [];

  getAllTasks() {
    const data = this.$store.getters[`task/${GET_ALL_TASKS}`];
    this.allTasks =  [ ...data ];
    this.showTasks = [ ...data ];
  }

  async getTaskDetail(curTask: ITask) {
    await this.$store.dispatch(`assignment/${LOAD_ALL_ASSIGNMENTS}`);
    const assignments: IAssignment[] = this.$store.getters[`assignment/${GET_ALL_ASSIGNMENTS}`];
    let isReceived = false;
    let aid = -1;
    assignments.forEach((assignment) => {
      if (assignment.task_id === curTask.id) {
        isReceived = true;
        aid = assignment.id;
      }
    });
    if (curTask.type === 'TASK_TYPE_SURVEY') {
      if (isReceived) {
        this.$router.push({
          name: 'answer-questionnaire',
          params: {
            aid: String(aid)
          }
        });
      } else {
        this.$router.push({
          name: 'view-questionnaire',
          params: {
            sid: String(curTask.id)
          }
        });
      }
    } else {
      if (isReceived) {
        this.$router.push({
          name: 'answer-custom-task',
          params: {
            aid: String(aid)
          }
        });
      } else {
        this.$router.push({
          name: 'view-custom-task',
          params: {
            tid: String(curTask.id)
          }
        });
      }
    }
  }

  selectTime(timeStatus: SortMap['time']) {
    this.sortMap.time = timeStatus;
    this.sortBytime = true;
    this.sortList(false);
  }

  selectBounty(bountyStatus: SortMap['bounty']) {
    this.sortMap.bounty = bountyStatus;
    this.sortBytime = false;
    this.sortList(false);
  }

  selecttype(type: SortMap['type']) {
    // 清除type选项时设为''
    type = type || '';
    this.sortMap.type = type;
    this.sortList(true);
  }

  // 先根据类型分类筛选，根据时间或价格进行排序
  sortList(filterType: boolean) {
    if (filterType) {
      if (this.sortMap.type) {
        this.showTasks = this.allTasks.filter((item) => item.type === this.sortMap.type);
      } else {
        this.showTasks = [ ...this.allTasks ];
      }
    }
    let sortType = '';
    let sortOrder = 0;
    if (this.sortMap.time && this.sortBytime) {
      sortType = 'created_at';
      sortOrder = this.sortMap.time;
    } else if (this.sortMap.bounty && !this.sortBytime) {
      sortType = 'reward';
      sortOrder = this.sortMap.bounty;
    }
    if (sortType && sortOrder) {
      this.showTasks.sort((a: ITask, b: ITask) => {
          if (a[sortType] > b[sortType]) {
            return sortOrder === 1 ? -1 : 1;
          } else if (a[sortType] < b[sortType]) {
            return sortOrder === 1 ? 1 : -1;
          } else {
            return 0;
          }
      });
    }
  }

  search() {
    // 避免上次搜索结果为空,而这次搜索拿空数据进行过滤
    this.sortList(true);
    this.showTasks = this.showTasks.filter((item, index) => item.title.includes(this.searchText));
  }

  async mounted() {
    await this.$store.dispatch(`task/${LOAD_ALL_TASKS}`);
    this.getAllTasks();
  }

  pageChange(page: number) {
    this.currentPage = page;
  }

  get showPageTasks(): ITask[] {
    return this.showTasks.filter(
      (item, index) => index / this.pageSize >= this.currentPage - 1 && index / this.pageSize < this.currentPage);
  }

}
</script>

<style lang="less" scoped>
.sort-group {
  display: flex;
  justify-content: center;
  .search {
    margin-left: 40px;
    width: auto;
  }
}

.select {
  width: 102px;
  margin-left: 10px;
}

.cards-container {
  margin-top: 20px;
  padding: 0 7px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .req-card {
    margin: 0 20px 20px 0;
  }
}

.page-container {
  display: flex;
  justify-content: center;
}
</style>


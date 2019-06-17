<template>
  <div>
    <div class="sort-group">
      <sort-button class="sort-btn" :reset="!sortBytime" title="时间" @status-change="selectTime"></sort-button>
      <sort-button class="sort-btn" :reset="sortBytime" title="价格" @status-change="selectBounty"></sort-button>
      <Input class="search" type='text' @on-change="search" v-model="searchText" clearable placeholder="请输入搜索内容" suffix="ios-search"/>
    </div>
    <div class="cards-container">
      <request-card class="req-card" v-for="(task, index) in showTasks"
      :key="index" :req="task" @click="getTaskDetail(index)"></request-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
    bounty: 0
  };
  sortBytime = false;
  searchText = '';

  allTasks: ITask[] = [];
  showTasks: ITask[] = [];

  getAllTasks() {
    const data = this.$store.getters[`task/${GET_ALL_TASKS}`];
    this.allTasks =  [ ...data ];
    this.showTasks = [ ...data ];
  }

  async getTaskDetail(index: number) {
    await this.$store.dispatch(`assignment/${LOAD_ALL_ASSIGNMENTS}`);
    const assignments: IAssignment[] = this.$store.getters[`assignment/${GET_ALL_ASSIGNMENTS}`];
    let isReceived = false;
    let aid = -1;
    assignments.forEach((assignment) => {
      if (assignment.task_id === this.allTasks[index].id) {
        isReceived = true;
        aid = assignment.id;
      }
    });
    if (this.allTasks[index].type === 'TASK_TYPE_SURVEY') {
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
            sid: String(this.allTasks[index].id)
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
            tid: String(this.allTasks[index].id)
          }
        });
      }
    }
  }

  selectTime(timeStatus: SortMap['time']) {
    this.sortMap.time = timeStatus;
    this.sortBytime = true;
    this.sortList();
  }

  selectBounty(bountyStatus: SortMap['bounty']) {
    this.sortMap.bounty = bountyStatus;
    this.sortBytime = false;
    this.sortList();
  }

  // 根据时间或价格进行排序
  sortList() {
    this.showTasks = [ ...this.allTasks ];
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
    this.sortList();
    this.showTasks = this.showTasks.filter((item, index) => item.title.includes(this.searchText));
  }

  async mounted() {
    await this.$store.dispatch(`task/${LOAD_ALL_TASKS}`);
    this.getAllTasks();
  }
}
</script>

<style lang="less" scoped>
.sort-group {
  padding-left: 20px;
  .search {
    margin-left: 40px;
    width: auto;
  }
}
.cards-container {
  margin-top: 20px;
  padding: 0 35px;
  .req-card {
    margin: 0 20px 20px 0;
  }
}
</style>


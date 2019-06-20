<template>
  <div>
    <div class="sort-group">
      <sort-button class="sort-btn" title="时间" @status-change="selectTime"></sort-button>
      <Select class="select" clearable @on-change="selectType" style="width:102px" placeholder="任务类型">
          <Option value="CUSTOM" key="CUSTOM">自定义任务</Option>
          <Option value="SURVEY" key="SURVEY">调查问卷</Option>
        </Select>
      <Input class="search" type='text' @on-change="search" v-model="searchText" clearable placeholder="请输入搜索内容" suffix="ios-search"/>
    </div>
    <Table class="assign-list" 
    stripe 
    :columns="tableColumns" 
    :data="showAssignments"
    @on-row-click="getAssignDetail"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SortButton from '@/components/SortButton.vue';
import { SortMap, RequsetMsg } from '@/typings/requestHall';
import store from '@/stores';
import { UID } from '@/stores/modules/user/constants';
import {
  GET_ALL_TASKS,
  GET_ALL_TASKS_OWN,
  LOAD_ALL_TASKS,
  LOAD_ALL_TASKS_OWN
  } from '../../stores/modules/task/constants';
import { ITask } from '@/typings/task';
import { LOAD_ALL_ASSIGNMENTS, GET_ALL_ASSIGNMENTS } from '../../stores/modules/assignment/constants';
import { IAssignment } from '../../typings/assignment';
import { ASSIGNMENT_STATUS_MAP, TASK_STATUS_MAP } from './constants';

@Component({
  name: 'assignments',
  components: {
    SortButton
  },
  async beforeRouteEnter(to: any, from: any, next: any) {
    if (to.name === 'a-accepted') {
      await store.dispatch(`assignment/${LOAD_ALL_ASSIGNMENTS}`);
      next((vm: any) => {
        vm.dataType = 'accepted';
        vm.getallAssignments(`assignment/${GET_ALL_ASSIGNMENTS}`);
      });
    } else {
      await store.dispatch(`task/${LOAD_ALL_TASKS_OWN}`);
      next((vm: any) => {
        vm.dataType = 'published';
        vm.getallAssignments(`task/${GET_ALL_TASKS_OWN}`);
      });
    }
  }
})
export default class Assignments extends Vue {

  tableColumns = [
    {
      title: '标题',
      key: 'title'
    },
    {
      title: '类型',
      key: 'type'
    },
    {
      title: '状态',
      key: 'status'
    },
    {
      title: '创建日期',
      key: 'created_at'
    }
  ];

  dataType = '';
  searchText = '';
  sortTimeOrder = 0;
  sortAssignType: any = '';

  allAssignments: IAssignment[] = [];
  showAssignments: IAssignment[] = [];

  getallAssignments(getterName: string) {
    const data = this.$store.getters[getterName];
    this.allAssignments =  JSON.parse(JSON.stringify(data));
    this.formatshowAssignments();
  }

  formatshowAssignments() {
    this.showAssignments = JSON.parse(JSON.stringify(this.allAssignments));
    this.showAssignments.forEach((item) => {
      item.created_at = item.created_at.split('Z')[0].replace('T', ' ');
      if (this.dataType === 'accepted') {
        item.status = ASSIGNMENT_STATUS_MAP[item.status];
      } else {
        item.status = TASK_STATUS_MAP[item.status];
      }
      item.type = item.type === 'TASK_TYPE_CUSTOM' ? '自定义任务' : '调查问卷';
    });
  }

  async getAssignDetail(data: IAssignment, index: number) {
    if (this.dataType === 'accepted') {
      if (data.type === '调查问卷') {
        this.$router.push({
          name: 'answer-questionnaire',
          params: {
            aid: String(data.id)
          }
        });
      } else {
        this.$router.push({
          name: 'answer-custom-task',
          params: {
            aid: String(data.id)
          }
        });
      }
    } else {
      if (data.type === '调查问卷') {
        this.$router.push({
          name: 'published-questionnaire-detail',
          params: {
            aid: String(data.id)
          }
        });
      } else {
        this.$router.push({
          name: 'published-custom-task-detail',
          params: {
            aid: String(data.id)
          }
        });
      }
    }
  }

  selectTime(timeStatus: 0 | 1 | -1) {
    this.sortTimeOrder = timeStatus;
    this.sortList();
  }

  selectType(assignType: string | undefined) {
    this.sortAssignType = assignType;
    this.sortList();
  }

  // 先根据任务类型分类，再根据时间进行排序
  sortList() {
    this.formatshowAssignments();
    if (this.sortAssignType) {
      this.showAssignments = this.showAssignments.filter((item) => {
        if (this.sortAssignType === 'CUSTOM') {
          return item.type === '自定义任务';
        } else {
          return item.type === '调查问卷';
        }
      });
    }
    if (this.sortTimeOrder) {
      this.showAssignments.sort((a: IAssignment, b: IAssignment) => {
          if (a.created_at > b.created_at) {
            return this.sortTimeOrder === 1 ? -1 : 1;
          } else if (a.created_at < b.created_at) {
            return this.sortTimeOrder === 1 ? 1 : -1;
          } else {
            return 0;
          }
      });
    }
  }

  search() {
    // 避免上次搜索结果为空,而这次搜索拿空数据进行过滤
    this.sortList();
    this.showAssignments = this.showAssignments.filter((item, index) => item.title.includes(this.searchText));
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
.assign-list {
  margin: 20px;
}
</style>


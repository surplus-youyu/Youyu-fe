<template>
  <div>
    <div class="sort-group">
      <sort-button class="sort-btn" :reset="!sortBytime" title="时间" @status-change="selectTime"></sort-button>
      <sort-button class="sort-btn" :reset="sortBytime" title="价格" @status-change="selectBounty"></sort-button>
      <div class="select-container">
        <Select class="select" clearable @on-change="selectCampus" style="width:200px" placeholder="校区">
          <Option value="east" key="east">东校园</Option>
          <Option value="north" key="north">北校园</Option>
          <Option value="south" key="south">南校园</Option>
          <Option value="Shenzhen" key="Shenzhen">深圳校园</Option>
        </Select>
      </div>
      <Input class="search" type='text' @on-enter="search" v-model="searchText" clearable placeholder="请输入搜索内容" suffix="ios-search"/>
    </div>
    <div class="cards-container">
      <request-card class="req-card" v-for="(item, index) in ShowReqs" :key="index" :req="item"></request-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SortButton from '@/components/SortButton.vue';
import RequestCard from '@/components/RequestCard.vue';
import { SortMap, RequsetMsg } from '@/typings/requestHall';
import {
  LOAD_REQUESTS,
  GET_PUBLIC_REQUESTS,
  GET_SELF_REQUESTS_SENT,
  GET_SELF_REQUESTS_RECEIVED,
  GET_SELF_REQUESTS_DONE,
  GET_SELF_REQUESTS_DRAFT
  } from '@/stores/modules/requests/constants';
import store from '@/stores';
import { UID } from '@/stores/modules/user/constants';
import { dataMap } from './constants';

@Component({
  name: 'requestHall',
  components: {
    SortButton,
    RequestCard
  },
  async beforeRouteEnter(to: any, from: any, next: any) {
    let data: RequestInfo[] = [];
    if (to.params.requestType === 'public') {
      const result = await store.dispatch(`requests/${LOAD_REQUESTS}`, 'public');
      if (result) {
        data = store.getters[`requests/${dataMap[to.params.requestType]}`];
      }
      next((vm: any) => {
        vm.Reqs = [ ...data ];
        vm.ShowReqs = [ ...data ];
      });
    } else {
      const uid = store.getters[`user/${UID}`];
      if (uid) {
        const result = await store.dispatch(`requests/${LOAD_REQUESTS}`, to.params.requestType, uid);
        if (result) {
          data = store.getters[`requests/${dataMap[to.params.requestType]}`];
          next((vm: any) => {
          vm.Reqs = [ ...data ];
          vm.ShowReqs = [ ...data ];
        });
        }
      } else {
        next('/login');
      }
    }
  },
  async beforeRouteUpdate(to: any, from: any, next: any) {
    const data: RequestInfo[] = [];
    if (to.params.requestType === 'public') {
      const result = await store.dispatch(`requests/${LOAD_REQUESTS}`, 'public');
    } else {
      const uid = store.getters[`user/${UID}`];
      if (uid) {
        const result = await store.dispatch(`requests/${LOAD_REQUESTS}`, to.params.requestType, uid);
      }
    }
    next();
  }
})
export default class RequestHall extends Vue {

  sortBytime = false;
  searchText = '';

  sortMap: SortMap = {
    time: 0,
    price: 0,
    campus: ''
  };

  Reqs: RequsetMsg[] = [];

  ShowReqs: RequsetMsg[] = [];

  selectTime(timeStatus: SortMap['time']) {
    this.sortMap.time = timeStatus;
    this.sortBytime = true;
    this.sortList(false);
  }

  selectBounty(bountyStatus: SortMap['price']) {
    this.sortMap.price = bountyStatus;
    this.sortBytime = false;
    this.sortList(false);
  }

  selectCampus(campus: SortMap['campus']) {
    // 清除campus选项时设为''
    campus = campus || '';
    this.sortMap.campus = campus;
    this.sortList(true);
  }

  // 首先先根据校区进行筛选,再根据时间或价格进行排序
  sortList(filterCampus: boolean) {
    if (filterCampus) {
      if (this.sortMap.campus) {
        this.ShowReqs = this.Reqs.filter((item) => item.campus === this.sortMap.campus);
      } else {
        this.ShowReqs = this.Reqs;
      }
    }
    let sortType = '';
    let sortOrder = 0;
    if (this.sortMap.time && this.sortBytime) {
      sortType = 'created_at';
      sortOrder = this.sortMap.time;
    } else if (this.sortMap.price && !this.sortBytime) {
      sortType = 'bounty';
      sortOrder = this.sortMap.price;
    }
    if (sortType && sortOrder) {
      this.ShowReqs.sort((a: RequsetMsg, b: RequsetMsg) => {
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
    this.ShowReqs = this.ShowReqs.filter((item) => item.title.includes(this.searchText));
  }

  mounted() {
    const data = store.getters[`requests/${dataMap[this.$route.params.requestType]}`];
    this.Reqs = [ ...data ];
    this.ShowReqs = [ ...data ];
  }
}
</script>

<style lang="less" scoped>
  .sort-group {
    padding-left: 20px;

    .sort-campus {
      margin-left: 20px;

      .icon {
        position: relative;
        top: -1px;
        left: 2px;
      }
    }

    .select-container {
      display: inline-block;

      .select {
        margin-left: 10px;
        width: 100px !important;
      }
    }

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


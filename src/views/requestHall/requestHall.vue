<template>
  <div>
    <div class="sort-group">
      <sort-button class="sort-btn" :reset="!sortBytime" title="时间" @status-change="selectTime"></sort-button>
      <sort-button class="sort-btn" :reset="sortBytime" title="价格" @status-change="selectPrice"></sort-button>
      <div class="select-container">
        <Select class="select" clearable @on-change="selectCampus" style="width:200px" placeholder="校区">
          <Option value="east" key="east">东校园</Option>
          <Option value="north" key="north">北校园</Option>
          <Option value="south" key="south">南校园</Option>
          <Option value="Shenzhen" key="Shenzhen">深圳校园</Option>
        </Select>
      </div>
      <Input class="search" type='text' @on-enter="search" v-model="searchText" clearable placeholder="请输入搜索内容">
        <Icon type="ios-search" slot="suffix" />
      </Input>
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
import router from '@/views/router';
@Component({
  name: 'requestHall',
  components: {
    SortButton,
    RequestCard
  },
  beforeRouteEnter(to: any, from: any, next: any) {
    next();
  },
  beforeRouteUpdate(to: any, from: any, next: any) {
    next( );
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

  testReq: RequsetMsg = {
    title: '快递帮拿',
    tags: ['快递', '明六'],
    desc: '送到明二',
    price: 10,
    campus: 'east',
    owner: '小明',
    publishTime: '2019-05-20 09:30'
  };

  testReq1: RequsetMsg = {
    title: '快递帮拿',
    tags: ['快递', '明六'],
    desc: '送到明二',
    price: 5,
    campus: 'east',
    owner: '小明',
    publishTime: '2019-05-20 21:30'
  };

  testReq2: RequsetMsg = {
    title: '快递帮拿',
    tags: ['快递', '明六'],
    desc: '送到明二',
    price: 5,
    campus: 'north',
    owner: '小明',
    publishTime: '2019-05-21 09:30'
  };

  testReq3: RequsetMsg = {
    title: '快递帮拿',
    tags: ['快递', '明六'],
    desc: '送到明二',
    price: 20,
    campus: 'south',
    owner: '小明',
    publishTime: '2019-05-21 19:30'
  };

  testReq4: RequsetMsg = {
    title: '快递帮',
    tags: ['快递', '明六'],
    desc: '送到明二',
    price: 30,
    campus: 'Shenzhen',
    owner: '小明',
    publishTime: '2019-05-14 19:30'
  };

  Reqs: RequsetMsg[] = [this.testReq1, this.testReq2, this.testReq3, this.testReq4, this.testReq];

  ShowReqs: RequsetMsg[] = this.Reqs;

  selectTime(timeStatus: SortMap['time']) {
    this.sortMap.time = timeStatus;
    this.sortBytime = true;
    this.sortList(false);
  }

  selectPrice(priceStatus: SortMap['price']) {
    this.sortMap.price = priceStatus;
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
      sortType = 'publishTime';
      sortOrder = this.sortMap.time;
    } else if (this.sortMap.price && !this.sortBytime) {
      sortType = 'price';
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


<template>
  <div>
    <div class="sort-group">
      <sort-button class="sort-btn" :reset="!sortBytime" title="时间" @status-change="selectTime"></sort-button>
      <sort-button class="sort-btn" :reset="sortBytime" title="价格" @status-change="selectPrice"></sort-button>
      <div class="select-container">
        <Select class="select" v-model="sortMap.campus" style="width:200px" placeholder="校区">
          <Option value="east" key="east">东校园</Option>
          <Option value="north" key="north">北校园</Option>
          <Option value="south" key="south">南校园</Option>
          <Option value="Shenzhen" key="Shenzhen">深圳校园</Option>
        </Select>
      </div>
      <Input class="search" placeholder="请输入搜索内容">
        <Icon type="ios-search" slot="suffix" />
      </Input>
    </div>
    <div class="cards-container">
      <request-card :req="testReq"></request-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SortButton from '@/components/SortButton.vue';
import RequestCard from '@/components/RequestCard.vue';
import { SortMap, RequsetMsg } from '@/typings/requestHall';
@Component({
  name: 'requestHall',
  components: {
    SortButton,
    RequestCard
  }
})
export default class RequestHall extends Vue {

  sortBytime = false;

  sortMap: SortMap = {
    time: 0,
    price: 0,
    campus: ''
  };

  testReq: RequsetMsg = {
    title: '快递帮拿',
    tags: ['快递', '明六'],
    desc: '送到明二',
    owner: '小明',
    publishTime: '2019-05-20 09:30'
  };

  selectTime(timeStatus: SortMap['time']) {
    this.sortMap.time = timeStatus;
    this.sortBytime = true;
  }

  selectPrice(priceStatus: SortMap['price']) {
    this.sortMap.price = priceStatus;
    this.sortBytime = false;
  }

  selectCampus(campus: SortMap['campus']) {
    this.sortMap.campus = campus;
  }

  // sortList() {

  // }
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
  }
</style>


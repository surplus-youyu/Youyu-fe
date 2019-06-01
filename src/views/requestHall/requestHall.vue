<template>
  <div>
    <div class="sort-group">
      <sort-button class="sort-btn" :reset="!sortBytime" title="时间" @status-change="selectTime"></sort-button>
      <sort-button class="sort-btn" :reset="sortBytime" title="价格" @status-change="selectPrice"></sort-button>
      <Dropdown class="sort-campus" @on-click="selectCampus">
          <span>校区</span>
          <Icon class="icon" size="16" type="ios-arrow-down"/>
        <DropdownMenu slot="list">
          <DropdownItem key="east">东校园</DropdownItem>
          <DropdownItem key="north">北校园</DropdownItem>
          <DropdownItem key="south">南校园</DropdownItem>
          <DropdownItem key="Shenzhen">深圳校园</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SortButton from '@/components/SortButton.vue';
import { SortMap } from '@/typings/requestHall';
@Component({
  name: 'requestHall',
  components: {
    SortButton
  }
})
export default class RequestHall extends Vue {

  sortBytime = false;

  sortMap: SortMap = {
    time: 0,
    price: 0,
    campus: 'east'
  }

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

  sortList() {

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
    
  }
</style>


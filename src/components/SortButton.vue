<template>
  <div class="btn_container">
      <i-button type='text' :class="{active: status !== 0}" @click="statusChange">{{title}}
        <Icon class="icon" size="16" :class="{active: status === 1}" type="ios-arrow-down" v-if="status > -1" />
        <Icon class="icon active" size="16" type="ios-arrow-up" v-else />
      </i-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({
  name: 'sort-button'
})

export default class SortButton extends Vue {
  @Prop({
    required: true
  })
  title !: string;

  @Prop({
    required: false
  })
  reset !: boolean;

  // -1 = 从小到大，1 = 从大到小， 0 = 默认。
  status = 0;

  @Emit()
  statusChange() {
    this.status = this.status < 1 ? this.status + 1 : - 1;
    return this.status;
  }

  @Watch('reset')
  resetBtn(val: boolean, oldVal: boolean) {
    this.status = val ? 0 : this.status;
  }
}
</script>

<style lang="less" scoped>
  .btn_container {
    display: inline-block;
  }

  .active {
    color: #0066cc;
  }

  .icon {
    position: relative;
    top: -1px;
    left: 2px;
  }
</style>

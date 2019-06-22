<template>
  <div class="btn_container">
      <i-button type='text' :class="{active: status !== 0}" @click="statusChange">{{title}}
        <Icon class="icon" size="16" :class="{active: status === 1}" type="ios-arrow-down" v-if="status === 1" />
        <Icon class="icon active" size="16" type="ios-arrow-up" v-else-if="status === -1" />
        <div class="bar" v-else></div>
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

  @Prop({
    default: true
  })
  readonly threeType !: boolean;

  // -1 = 从小到大，1 = 从大到小， (0 = 默认)。
  status = 0;

  mounted() {
    if (this.threeType) {
      this.status = 0;
    } else {
      this.status = 1;
    }
  }

  @Emit()
  statusChange() {
    if (this.threeType) {
      this.status = this.status < 1 ? this.status + 1 : - 1;
    } else {
      this.status = -this.status;
    }
    return this.status;
  }

  @Watch('reset')
  resetBtn(val: boolean, oldVal: boolean) {
    const defaultValue = this.threeType ? 0 : 1;
    this.status = val ? defaultValue : this.status;
  }
}
</script>

<style lang="less" scoped>
  .btn_container {
    display: inline-block;
    .bar {
      position: relative;
      display: inline-block;
      bottom: 5px;
      width: 11px;
      height: 2px;
      margin: 0 0px 0 5px;
      background-color: black;
    }
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

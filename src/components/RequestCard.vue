<template>
 <card class="card">
  <p class="title" slot="title">{{req.title}} </p>
  <div class="type">
    <span>{{typeMap[req.type]}}</span>
  </div>
  <p class="desc">{{req.description}}</p>
  <div>
    <span>￥{{req.reward}}</span>
  </div>
  <div>
    <span>发布者：{{req.creator}}</span>
    <span class="req-pbtime">{{timeFormat(req.created_at)}}</span>
  </div>
  <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
    <Button type="primary" @click="$emit('click')">查看详情</Button>
  </div>
</card>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { RequsetMsg } from '@/typings/requestHall';
import { DateFormat } from '@/utils/format';
import { IIndexSignatureMap } from '@/views/assignments/constants';
@Component({
  name: 'request-card'
})

export default class RequestCard extends Vue {

  typeMap: IIndexSignatureMap = {
    TASK_TYPE_SURVEY: '调查问卷',
    TASK_TYPE_CUSTOM: '自定义任务'
  };

  @Prop({
    required: true
  })
  req !: RequsetMsg;

 timeFormat(time: string) {
    return DateFormat(new Date(time));
  }


}
</script>


<style lang="less" scoped>
.card {
  display: inline-block;
  width: 400px;

    .title {
      font-size: 16px;
    }
     
    .desc {
      width: 360px;
      height: 38px;
      margin: 10px 0;
      font-size: 14px;
      line-height: 19px;
      overflow:hidden;
      text-overflow:ellipsis;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient:vertical;
    }

    .req-pbtime {
      float: right;
    }
}
</style>

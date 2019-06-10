<template>
 <card class="card">
    <p class="title" slot="title">{{req.title}} </p>
    <div class="tags">
      <Tag class="tag" v-for="tag in req.tags" :key="tag" :fade="false" color="default">{{tag}}</Tag>
    </div>
    <p class="desc">{{req.summary}}</p>
    <div>
      <span>{{ campusMap[req.campus] }}  </span>
      <span>￥{{req.bounty}}</span>
    </div>
    <div>
      <span>发布者：{{req.owner}}</span>
      <span class="req-pbtime">{{req.created_at}}</span>
    </div>
  </card>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { RequsetMsg } from '@/typings/requestHall';

@Component({
  name: 'request-card'
})

export default class RequestCard extends Vue {

  @Prop({
    required: true
  })
  req !: RequsetMsg;

  campusMap = {
    east: '东校园',
    north: '北校园',
    south: '南校园',
    Shenzhen: '深圳校园'
  };

}
</script>


<style lang="less" scoped>
.card {
  display: inline-block;
  width: 400px;

    .title {
      font-size: 16px;
    }

    .tags {
      .tag {
        margin-right: 10px;
      }
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

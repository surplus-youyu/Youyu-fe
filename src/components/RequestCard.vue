<template>
 <card class="card">
    <p class="title" slot="title">{{req.title}} </p>
    <div class="tags">
      <Tag class="tag" v-for="tag in req.tags" :key="tag" color="default">{{tag}}</Tag>
    </div>
      <p class="desc">{{req.desc}}</p>
    <div>
      <span>发布者：{{req.owner}}</span>
      <span class="req-pbtime">{{req.publishTime}}</span>
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

}
</script>


<style lang="less" scoped>
.card {
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

<template>
  <div class="about-container">
    <h1>有余</h1>
    <div class="about">
      <p><strong>有余</strong>是大学生通过做任务挣钱的云平台，它属于以运营为中心的服务软件，也可以理解为面向大学生的专业“众包”系统。系统非常简单：有一个云服务中心；每个学生都装有“有余”客户端；一些机构，称为“奶牛”，他们提供任务给平台。基本业务是，<strong>奶牛发布任务要求与薪酬，系统推送到客户端，学生完成任务可获得系统内部的“闲钱币”，“闲钱币”可用于发布任务或提现。</strong></p>
      <p>有余系统包括是学生管理系统、任务管理系统、交易管理系统、账户管理系统等，特别合适采用面向服务的架构实现。系统的难点在于运营，即任务（业务）的发现与投放。</p>
      <p>支持自定义任务，包括但不限于：</p>
      <ol>
        <li>问卷的发放和填写</li>
        <li>跑腿任务</li>
        <li>游戏陪玩 ……</li>
      </ol>
      <p>同时，平台还支持公益性的消息公示，比如失物招领。</p>
    </div>
    <h2>项目结构及技术栈</h2>
    <ul>
      <li>Web前端：NodeJS、Vue、webpack</li>
      <li>后端：Go、MySQL、redis、docker、nginx</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'about'
})
export default class About extends Vue {

}
</script>

<style lang="less" scoped>
.about-container {
  padding: 20px;
  .about {
    font-size: 18px;
  }
  p {
    margin: 20px 0;
  }
  ol {
    margin-left: 40px;
  }
  h2 {
    margin-bottom: 10px;
  }
  ul {
    margin-left: 20px;
    font-size: 18px;
  }
}

</style>


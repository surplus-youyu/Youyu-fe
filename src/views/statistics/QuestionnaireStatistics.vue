<template>
  <div>
    <Card v-for="(item, idx) in statisticResult" :key="idx" >
      <h1>{{item.title}}</h1>
      <ve-pie :data="item.chartData"></ve-pie>
    </Card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { httpRequestSilence } from '../../utils/httpRequest';
import { IResponse } from '../../typings/response';

@Component({
  name: 'q-statistic'
})
export default class QuestionnaireStatistics extends Vue  {
  statisticResult: any[] = [];

  async mounted() {
    const taskId = this.$route.params.aid;
    const { data } =  await httpRequestSilence.get<IResponse<{}> >(`/tasks/${taskId}/statistics`);
    if (data.data) {
      const result: any = data.data;
      result.forEach((ele: any) => {
        const tmp: any = {
          columns: ['选项', '选择用户数量'],
          rows: []
        };
        for (const key of Object.keys(ele)) {
          if (key === 'title') {
            continue;
          }
          tmp.rows.push({
            选项: key,
            选择用户数量: ele[key]
          });
        }
        this.statisticResult.push({ title: ele.title, chartData: tmp});
      });
    }
  }
}
</script>

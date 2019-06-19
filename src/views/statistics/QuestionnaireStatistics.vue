<template>
    <Table class="statistics-list"></Table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionnaire } from '@/typings/publish';
import { GET_QUESTIONARE_SUBMITS } from '@/stores/modules/questionnaire/constants';

@Component({
  name: 'questionnaireStatistics'
})
export default class QuestionnaireStatistics extends Vue {

  list: IQuestionnaire[] = [];

  TableColumns = [
    {
      title: '标题',
      key: 'title'
    },
    {
      title: '类型',
      key: 'type'
    },
    {
      title: '状态',
      key: 'status'
    },
    {
      title: '创建日期',
      key: 'created_at'
    }
  ];

  mounted() {
    const data = this.$store.getters[`questionnaire/${GET_QUESTIONARE_SUBMITS}`];
    console.log(data);
    this.list = JSON.parse(JSON.stringify(data));
  }
}
</script>


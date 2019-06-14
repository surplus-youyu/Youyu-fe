<template>
  <div>
    <div class="cards-container">
      <request-card class="req-card" v-for="(task, index) in allTasks" 
      :key="index" :req="task" @click="getTaskDetail(index)"></request-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SortButton from '@/components/SortButton.vue';
import RequestCard from '@/components/RequestCard.vue';
import { SortMap, RequsetMsg } from '@/typings/requestHall';
import store from '@/stores';
import { UID } from '@/stores/modules/user/constants';
import { GET_ALL_TASKS, LOAD_ALL_TASKS } from '../../stores/modules/task/constants';
import { ITask } from '@/typings/task';
import { LOAD_ALL_ASSIGNMENTS, GET_ALL_ASSIGNMENTS } from '../../stores/modules/assignment/constants';
import { IAssignment } from '../../typings/assignment';

@Component({
  name: 'requestHall',
  components: {
    SortButton,
    RequestCard
  }
})
export default class RequestHall extends Vue {
  get allTasks(): ITask[] {
    return this.$store.getters[`task/${GET_ALL_TASKS}`];
  }

  async getTaskDetail(index: number) {
    if (this.allTasks[index].type === 'TASK_TYPE_SURVEY') {
      await this.$store.dispatch(`assignment/${LOAD_ALL_ASSIGNMENTS}`);
      const assignments: IAssignment[] = this.$store.getters[`assignment/${GET_ALL_ASSIGNMENTS}`];
      let isReceived = false;
      let aid = -1;
      assignments.forEach((assignment) => {
        if (assignment.task_id === this.allTasks[index].id) {
          isReceived = true;
          aid = assignment.id;
        }
      });
      if (isReceived) {
        this.$router.push({
          name: 'answer-questionnaire',
          params: {
            aid: String(aid)
          }
        });
      } else {
        this.$router.push({
          name: 'view-questionnaire',
          params: {
            sid: String(this.allTasks[index].id)
          }
        });
      }
    }
  }

  async mounted() {
    await this.$store.dispatch(`task/${LOAD_ALL_TASKS}`);
  }
}
</script>

<style lang="less" scoped>

</style>


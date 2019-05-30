  <template>
  <div class="publish-questionare">
    <Modal v-model="showCreaterDialog" :footer-hide="true">
      <question-form
      @createNewQuestion="newQuestionHandler"
      :inputContent="plainContent"
      mode="create"/>
    </Modal>
    <div style="position: fixed; bottom: 10vh; z-index: 100;" >
      <Button type="primary" icon="md-add" shape="circle" @click="createQuestion" size="large"></Button>
    </div>
    <h1 style="margin-bottom: 1rem;">创建你的问卷</h1>
    <Input type="text" placeholder="输入问卷题目" style="width: 50%;"
    v-model="currentQuestionare.title"/>
    <h3 v-if="currentQuestionare.content.length === 0" 
      style="text-align: center; height: 200px; line-height: 200px;
      vertical-align: middle;">
      你的问卷还没有任何问题哦，点击左下方的“+”按钮创建吧！
    </h3>
    <Card :dis-hover="true" style="margin: 1rem 0 0 0" 
      v-for="(content, idx) in currentQuestionare.content" :key="'content' + idx">
      <question-form 
      :inputContent="content"
      @modifyQuestion="modifyQuestionHandler"
      mode="edit"
      :index="idx"/> 
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionareContent, IQuestionare } from '@/typings/publish';
import QuestionForm from '@/components/QuestionForm.vue';
import { CURRENT_USER_INFO } from '../../stores/modules/user/constants';

@Component({
  name: 'publish-questionare',
  components: {
    QuestionForm
  }
})
export default class Publish extends Vue {
  showCreaterDialog: boolean = false;

  plainContent: IQuestionareContent = {
    title: '',
    type: 1,
    options: [],
    optional: true,
    limit: 1
  };

  currentQuestionare: IQuestionare = {
    title: '',
    publisher_id: -1,
    content: []
  };

  newQuestionHandler(content: IQuestionareContent) {
    this.showCreaterDialog = false;
    this.currentQuestionare.content.push(content);
  }

  modifyQuestionHandler(content: IQuestionareContent, index: number) {
    this.currentQuestionare.content[index] = content;
  }

  createQuestion() {
    this.showCreaterDialog = true;
  }

  mounted() {
    if (this.$store.getters[`user/${CURRENT_USER_INFO}`] !== null) {
      this.currentQuestionare.publisher_id = this.$store.getters[`user/${CURRENT_USER_INFO}`].uid;
    }
  }
}
</script>
<style lang="less">
</style>


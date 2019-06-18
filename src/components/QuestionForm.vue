<template>
  <Form class="question-creater" ref="questionForm" 
  label-position="right" :label-width="90" :model="content"
  :rules="rules">
    <FormItem label="题目" prop="title">
      <Input type="text" v-model="content.title" :disabled="mode === 'edit' && !editAllow"
      placeholder="输入题目"/>
    </FormItem>
    <FormItem label="题目类型">
      <RadioGroup v-model="content.type">
        <Radio :label="1" :disabled="mode === 'edit' && !editAllow">单选</Radio>
        <Radio :label="2" :disabled="mode === 'edit' && !editAllow">多选</Radio>
        <Radio :label="3" :disabled="mode === 'edit' && !editAllow">填空</Radio>          
      </RadioGroup>
    </FormItem>
    <FormItem label="是否必须填写">
     <RadioGroup v-model="isOptional">
        <Radio :label="1" :disabled="mode === 'edit' && !editAllow">是</Radio>
        <Radio :label="0" :disabled="mode === 'edit' && !editAllow">否</Radio>         
      </RadioGroup>
    </FormItem>
    <FormItem label="填写数量限制" v-if="content.type === 2">
      <Slider v-model="content.limit" :disabled="mode === 'edit' && !editAllow"
      :max="content.options.length"></Slider>
    </FormItem>
    <FormItem label="选项" label-position="top" v-if="content.type !== 3" prop="options">
      <div class="option-wrapper" v-for="(option, idx) in content.options" :key="idx" style="margin-bottom: 8px;" >
        <Input type=text v-model="content.options[idx]" :disabled="mode === 'edit' && !editAllow"/>
        <Button v-if="mode !== 'edit' || editAllow" type="text" @click="delOption(idx)" icon="md-close" style="padding-right: 8px; padding-left: 8px; margin-left: 2px;"/>
      </div>
      <Button @click="addNewOption" :disabled="mode === 'edit' && !editAllow">添加</Button>
    </FormItem>
    <FormItem id="q-submit" style="margin-bottom: 0">
      <Button v-if="mode === 'edit'" @click="editAllow = !editAllow"
      style="margin-right: 1rem;">
        {{ editAllow ? '正在编辑' : '编辑'}}
      </Button>
      <Button type="primary" @click="submitQuestion" :disabled="mode === 'edit' && !editAllow">提交</Button>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IQuestionnaireContent } from '@/typings/publish';
import { Form } from 'iview/types/form';

@Component({
  name: 'question-form'
})
export default class QuestionForm extends Vue {
  @Prop({
    required: true
  })
  inputContent !: IQuestionnaireContent;

  content: IQuestionnaireContent = {
    title: '',
    type: 1,
    options: [],
    optional: true,
    limit: 1
  };

  @Prop({
    required: true,
    type: String
  })
  mode !: 'create' | 'edit';

  @Prop({
    required: false,
    type: Number
  })
  index !: number;

  editAllow: boolean = false;

  get isOptional() {
    return this.content.optional ? 1 : 0;
  }

  set isOptional(newVal: number) {
    if (newVal === 1) {
      this.content.optional = true;
    } else {
      this.content.optional = false;
    }
  }

  rules = {
    title: [
      { required: true, message: '题目不能为空', trigger: 'blur' }
    ],
    options: [
      {
        required: true, message: '选项不能为空',
        validator: (rule: any, value: string[], callback: any) => {
          if (this.content.type !== 3 && value.length === 0) {
            callback(new Error('选项不能为空'));
          } else {
            callback();
          }
        }
      }
    ]
  };

  addNewOption() {
    this.content.options.push('new options');
  }

  delOption(index: number) {
    this.content.options.splice(index, 1);
  }

  submitQuestion() {
    (this.$refs.questionForm as Form).validate((isValid) => {
      if (isValid) {
        this.$Notice.success({
          title: '成功',
          duration: 2
        });
        if (this.mode === 'create') {
          this.$emit('createNewQuestion', Object.assign({}, this.content));
          this.clear();
        } else {
          this.editAllow = false;
          this.$emit('modifyQuestion', Object.freeze(this.content), this.index);
        }
      }
    });
  }

  clear() {
    this.content.title = this.inputContent.title;
    this.content.type = this.inputContent.type;
    this.content.optional = this.inputContent.optional;
    this.content.limit = this.inputContent.limit;
    this.inputContent.options.forEach((val: string) => {
      this.content.options.push(val);
    });
  }

  mounted() {
    this.clear();
  }
}
</script>
<style lang="less">
.question-creater {
  margin-top: 2rem;
  #q-submit {
    .ivu-form-item-content {
      display: flex;
      justify-content: flex-end;
    }
  }
  .ivu-form-item {
    display: flex;
    label {
      flex: 1;
      text-align: left;
    }
    .ivu-form-item-content {
      flex: 5;
      margin-left: 1rem !important;
    }
    .ivu-radio-group {
      .ivu-radio-wrapper {
        width: 4rem;
      }
    }
  }
  .option-wrapper {
    display: flex;
    align-items: center;
  }
  .ivu-slider-wrap {
    width: 50% !important;
  }
}
</style>

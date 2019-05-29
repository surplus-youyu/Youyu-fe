<template>
  <Form class="question-creater" ref="questionForm" 
  label-position="right" :label-width="90" :model="content"
  :rules="rules">
    <FormItem label="题目" prop="title">
      <Input type="text" v-model="content.title" placeholder="输入题目"/>
    </FormItem>
    <FormItem label="题目类型">
      <RadioGroup v-model="content.type">
        <Radio :label="1">单选</Radio>
        <Radio :label="2">多选</Radio>
        <Radio :label="3">填空</Radio>          
      </RadioGroup>
    </FormItem>
    <FormItem label="是否必须填写">
     <RadioGroup v-model="isOptional">
        <Radio :label="1">是</Radio>
        <Radio :label="0">否</Radio>         
      </RadioGroup>
    </FormItem>
    <FormItem label="填写数量限制" v-if="content.type === 2">
      <Slider v-model="content.limit"
      :max="content.options.length"></Slider>
    </FormItem>
    <FormItem label="选项" label-position="top" v-if="content.type !== 3" prop="options">
      <Button @click="addNewOption">添加</Button><br>
      <div v-for="(option, idx) in content.options" :key="idx" >
        <Input type=text v-model="content.options[idx]"/><br>
      </div>
    </FormItem>
    <FormItem id="q-submit">
      <Button @click="createNewQuestion">提交</Button>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IQuestionareContent } from '@/typings/publish';
import { Form } from 'iview/types/form';

@Component({
  name: 'question_creater'
})
export default class QuestionCreater extends Vue {
  content: IQuestionareContent = {
    title: '',
    type: 1,
    options: [],
    optional: true,
    limit: 1
  };

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
      },
    ]
  };

  addNewOption() {
    this.content.options.push('new options');
  }

  createNewQuestion() {
    (this.$refs['questionForm'] as Form).validate((isValid) => {
      if (isValid) {
        this.$Notice.success({
          title: '成功创建',
          duration: 2
        });
        this.$emit('createNewQuestion', Object.freeze(this.content));
      }
    });
  }
}
</script>
<style lang="less">
.question-creater {
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
  .ivu-slider-wrap {
    width: 50% !important;
  }
  .ivu-input-wrapper {
    width: 50% !important;
  }
}
</style>

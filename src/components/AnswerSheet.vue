<template>
  <Card class="answer-sheet" dis-hover style="margin: 1rem auto 0 auto; width: 45%; min-width: 400px; max-width: 500px;">
    <Form v-if="inputQuestion.type === 1" :rules="singleChoiceRule" ref="single" :model="answer">
      <p>{{inputQuestion.title}}</p>
      <Label style="margin-top: 1rem; display: inline-block;">单选</Label>
      <FormItem prop="radio">
        <RadioGroup v-model="answer.radio" @on-change="radioChange">
          <Radio v-for="(option, idx) in inputQuestion.options" 
            class="single-selection-form"
            :disabled="readonly"
            :key="`option-${option + idx}`"
            :label="idx" prop="single">
            {{ option }}
          </Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <Form v-else-if="inputQuestion.type === 2" :rules="multiChoiceRule" ref="multi" :model="answer">
      <p>{{inputQuestion.title}}</p>
      <Label style="margin-top: 1rem; display: inline-block;">多选：{{ inputQuestion.limit }}</Label>
      <FormItem prop="checkBox">
        <CheckboxGroup v-model="answer.checkBox" @on-change="checkboxChange">
          <Checkbox 
            v-for="(option, idx) in inputQuestion.options" :key="`option-multi-${option + idx}`"
            class="multi-selection-form"
            :disabled="readonly"
            :label="idx">
            {{ option }}
          </Checkbox>
        </CheckboxGroup>
      </FormItem>
    </Form>
    <Form v-else ref="input" :rules="inputRule" :model="answer">
      <p style="width: 45%; min-width: 400px; max-width: 500px;">{{inputQuestion.title}}</p>
      <FormItem prop="input">
        <Input :disabled="readonly"
        v-model="answer.input" placeholder="输入答案" class="input-form" @on-change="inputChange"/>
      </FormItem>
    </Form>
  </Card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { IQuestionnaireContent } from '../typings/publish';
import { Form } from 'iview/types/form';

interface IAnswerSheet {
  radio: number;
  checkBox: number[];
  input: string;
}

@Component({
  name: 'answer-sheet'
})
export default class AnswerSheet extends Vue {
  @Prop({
    required: true
  })
  inputQuestion !: IQuestionnaireContent;

  @Prop({
    required: true,
    type: Number
  })
  index !: number;

  @Prop({required: true, type: Boolean}) readonly !: boolean;

  answer: IAnswerSheet = {
    radio: -1,
    checkBox: [],
    input: ''
  };

  singleChoiceRule = {
    radio: [
      {
        validator: (rule: any, value: number, callback: any) => {
          if (this.inputQuestion.optional && value === -1) {
            callback(new Error('选项不能为空'));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ]
  };

  multiChoiceRule = {
    checkBox: [
      {
        validator: (rule: any, value: number[], callback: any) => {
          if (this.inputQuestion.optional && value.length === 0) {
            callback(new Error('选项不能为空'));
          } else if (this.inputQuestion.limit < value.length) {
            callback(new Error('选项超过题目限制'));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ]
  };

  inputRule = {
    input: [
      {
        validator: (rule: any, value: string, callback: any) => {
          if (this.inputQuestion.optional && value.length === 0) {
            callback(new Error('选项不能为空'));
          } else {
            callback();
          }
        },
        trigger: 'blur'
      }
    ]
  };

  // @Emit('radio-change')
  // @Watch('radio')
  // radioChange() {
  //   return {
  //     radio: this.answer.radio,
  //     index: this.index
  //   };
  // }

  // @Emit('checkbox-change')
  // @Watch('checkBox')
  // checkboxChange() {
  //   return {
  //     checkbox: this.answer.checkBox,
  //     index: this.index
  //   };
  // }

  // @Emit('input-change')
  // @Watch('input')
  // inputChange() {
  //   return {
  //     input: this.answer.input,
  //     index: this.index
  //   };
  // }

  radioChange(option: number) {
    this.inputQuestion.answer = [ this.inputQuestion.options[option] ];
  }

  checkboxChange(options: number[]) {
    this.inputQuestion.answer = options.map((index) => this.inputQuestion.options[index]);
  }

  inputChange(event: any) {
    this.inputQuestion.answer = [ this.answer.input ];
  }

  validate(): boolean {
    let isValid = false;
    if (this.inputQuestion.type === 1) {
      (this.$refs.single as Form).validate((valid) => {
        isValid = valid || false;
      });
    } else if (this.inputQuestion.type === 2) {
      (this.$refs.multi as Form).validate((valid) => {
        isValid = valid || false;
      });
    } else {
      (this.$refs.input as Form).validate((valid) => {
       isValid = valid || false;
      });
    }
    return isValid;
  }
}
</script>
<style lang="less">
.answer-sheet {
  .single-selection-form {
    display: block;
    margin-top: 1rem;
  }
  .multi-selection-form {
    display: block;
    margin-top: 1rem;
  }
  .input-form {
    margin-top: 1rem;
  }
}
</style>

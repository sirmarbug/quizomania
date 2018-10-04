<template>
    <div class="question">
      <title-question :title="question.question" :alert="false"></title-question>
        <result-single-answer :answers="question.answers" :goodAnswer="question.goodAnswers[0]" :userAnswer="userAnswer" v-if="question.goodAnswers.length === 1"></result-single-answer>
      <result-multi-answer :answers="question.answers" :goodAnswers="question.goodAnswers" :userAnswers="userAnswer"
                           v-if="question.goodAnswers.length > 1"></result-multi-answer>
    </div>
</template>

<script>
  import TitleQuestion from "@components/Question/TitleQuestion";
  import ResultSingleAnswer from "@components/Question/Answer/ResultSingleAnswer";
  import ResultMultiAnswer from "@components/Question/Answer/ResultMultiAnswer";
    export default {
      name: "ExamResultQuestion",
      props: {
        question: {
          type: Object,
          required: true
        },
        userAnswer: {
          type: String | Array,
          required: true
        }
      },
      components: {
        TitleQuestion,
        ResultSingleAnswer,
        ResultMultiAnswer
      }
    }
</script>

<style scoped>
.question {
  margin-bottom: 20px;
}
</style>

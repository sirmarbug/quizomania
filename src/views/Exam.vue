<template>
  <div class="row row-first align-items-center">
    <div class="col-sm">
      <h1>Test</h1>
      <!-- COUNT QUESTIONS -->
      <div v-if="!isCount">
        <b-form-input type="text" placeholder="Ilość pytań na egzaminie" v-model.number="count"></b-form-input>
        <b-button variant="outline-secondary" @click="start">Start</b-button>
      </div>
      <!-- EXAM -->
      <div v-if="isCount && !endExam">
        <question class="question" :question="examQuestions[numberOfQuestions - 1]"></question>
        <b-button variant="outline-secondary" v-if="numberOfQuestions < count" @click="next">Następny</b-button>
        <b-button variant="outline-secondary" v-if="numberOfQuestions === count" @click="stop">Zakończ</b-button>
      </div>
      <!-- RESULT -->
      <div v-if="count === numberOfQuestions && endExam">
        <exam-result :questionCount="count" :questions="examQuestions"></exam-result>
        <b-button variant="outline-secondary" @click="newExam">Nowy egzamin</b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import questions from "@/utils/question.js";
  import Question from "@components/Question";
  import ExamResult from "@components/ExamResult";
  import { removingEmptyQuestions, drawQuestions, createExamQuestions } from "@mixins/database";

  export default {
    data() {
      return {
        examQuestions: [],
        count: null,
        isCount: false,
        numberOfQuestions: 1,
        endExam: false
      }
    },
    watch: {},
    methods: {
      start() {
        const questionsArrayWithAnswers = removingEmptyQuestions(questions);
        const questionsNumberArray = drawQuestions(this.count, questionsArrayWithAnswers.length);
        this.examQuestions = createExamQuestions(questionsArrayWithAnswers, questionsNumberArray)
        this.isCount = true;
      },
      next() {
        this.numberOfQuestions++;
        this.$store.dispatch('question/newQuestion');
      },
      stop() {
        this.endExam = true;
        this.$store.commit('exam/enableResult');
        this.$store.dispatch('question/newQuestion');
      },
      newExam() {
        this.$store.commit('exam/disableResult');
        this.$store.commit('exam/resetAnswersArray');
        this.examQuestions = [];
        this.count = null;
        this.isCount = false;
        this.numberOfQuestions = 1;
        this.endExam = false;
        this.$store.dispatch('question/newQuestion');
        this.$store.dispatch('statistics/reset');
      }
    },
    components: {
      Question,
      ExamResult,
    },
    mounted() {
      // QUESTION MODE
      this.$store.commit('question/setMode', this.$route.name);
      this.$store.commit('exam/disableResult');
    }
  }

</script>

<style scoped>
</style>

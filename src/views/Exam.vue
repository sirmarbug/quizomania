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
      <div v-if="isCount && !end">
        <question class="question" :question="examQuestions[nr - 1]"></question>
        <b-button variant="outline-secondary" v-if="nr < count" @click="next">Następny</b-button>
        <b-button variant="outline-secondary" v-if="nr === count" @click="stop">Zakończ</b-button>
      </div>
      <!-- RESULT -->
      <div v-if="count === nr && end">
        <exam-result :questionCount="count"></exam-result>
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
        nr: 1,
        end: false
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
        this.nr++;
        this.$store.dispatch('question/newQuestion');
      },
      stop() {
        this.end = true;
        this.$store.dispatch('question/newQuestion');
      },
      newExam() {
        this.examQuestions = [];
        this.count = null;
        this.isCount = false;
        this.nr = 1;
        this.end = false;
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
    }
  }

</script>

<style scoped>
</style>

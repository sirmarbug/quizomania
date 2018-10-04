<template>
  <div>
    <h5>Wynik</h5>
    <h6 :class="{ 'good-mark': mark >= 50, 'bad-mark': mark < 50 }">Ocena: {{ mark }}</h6>
    <p>Poprawne: {{ goodAnswers }}</p>
    <p>Błędne: {{ badAnswers }}</p>
    <div v-for="(question, index) in questions">
      <exam-result-question :question="question" :userAnswer="userAnswers[index]"></exam-result-question>
    </div>
  </div>
</template>

<script>
  import ExamResultQuestion from '@components/ExamResultQuestion'
  import {mapState} from 'vuex';

  export default {
    props: {
      questionCount: {
        type: Number,
        required: true
      },
      questions: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        mark: 0
      }
    },
    computed: {
      ...mapState('statistics', {
        goodAnswers: state => state.goodAnswers,
        badAnswers: state => state.badAnswers,
      }),
      ...mapState('exam', {
        userAnswers: state => state.answers
      })
    },
    watch: {},
    methods: {},
    mounted() {
      this.mark = this.goodAnswers / this.questionCount * 100;
    },
    components: {
      ExamResultQuestion
    }
  }
</script>

<style scoped>
  .good-mark {
    color: green;
  }

  .bad-mark {
    color: red;
  }
</style>

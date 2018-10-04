<template>
  <div>
    <h5>Wynik</h5>
    <h6 :class="{ 'good-mark': mark >= 50, 'bad-mark': mark < 50 }">Ocena: {{ mark }}</h6>
    <p>Poprawne: {{ goodAnswers }}</p>
    <p>Błędne: {{ badAnswers }}</p>
    <div v-for="question in questions">
      {{ question.question }}
    </div>
  </div>
</template>

<script>
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
        answers: state => state.answers
      })
    },
    watch: {},
    methods: {},
    mounted() {
      this.mark = this.goodAnswers / this.questionCount * 100;
    },
    components: {

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

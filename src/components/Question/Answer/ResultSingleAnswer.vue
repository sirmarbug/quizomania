<template>
    <div>
      <p v-for="answer in answers" :key="answer" :class="{'good-answer': (submitClick && answer === goodAnswer && !exam) || (examResult && answer === goodAnswer), 'bad-answer': (submitClick && answer !== goodAnswer && userAnswer === answer  && !exam) || (examResult && answer !== goodAnswer && userAnswer === answer)}">{{ answer }}</p>
    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';

    export default {
      name: "ResultSingleAnswer",
      props: {
        answers: {
          type: Array,
          required: true
        },
        goodAnswer: {
          type: String,
          required: true
        },
        userAnswer: {
          type: String,
          required: true
        }
      },
      computed: {
        ...mapState('question', {
          submitClick: 'submitClick'
        }),
        ...mapState('exam', {
          examResult: 'result'
        }),
        ...mapGetters('question', {
          exam: 'examMode'
        })
      }
    }
</script>

<style scoped>

</style>

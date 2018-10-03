<template>
  <div>
    <form action="#" @submit.prevent="submit">

      <!-- TITLE -->
      <title-question class="title-question" :title="question.question"
                      :alert="question.goodAnswers[0] === '' || question.goodAnswers.length === 0"></title-question>

      <!-- BODY -->
      <single-answer :answers="mixedAnswer" :goodAnswer="question.goodAnswers[0]" @getUserAnswer="getUserAnswer"
                     v-if="question.goodAnswers.length === 1" v-show="!submitClick"></single-answer>

      <result-single-answer :answers="mixedAnswer" :goodAnswer="question.goodAnswers[0]" :userAnswer="userSingleAnswer"
                            v-if="question.goodAnswers.length === 1" v-show="submitClick"></result-single-answer>

      <multi-answer :answers="mixedAnswer" :goodAnswers="question.goodAnswers" @getUserMultiAnswers="getUserMultiAnswers"
                    v-if="question.goodAnswers.length > 1" v-show="!submitClick"></multi-answer>

      <result-multi-answer :answers="mixedAnswer" :goodAnswers="question.goodAnswers" :userAnswers="userMultiAnswer"
                           v-if="question.goodAnswers.length > 1" v-show="submitClick"></result-multi-answer>

      <!-- FOOTER -->
      <footer-question class="footer-question"
                       :disabled="!selectedAnswer || submitClick || question.goodAnswers[0] === '' || question.goodAnswers.length === 0"></footer-question>
    </form>
  </div>
</template>

<script>
  import TitleQuestion from "@components/Question/TitleQuestion";
  import SingleAnswer from "@components/Question/Answer/SingleAnswer";
  import MultiAnswer from "@components/Question/Answer/MultiAnswer";
  import ResultSingleAnswer from "@components/Question/Answer/ResultSingleAnswer";
  import ResultMultiAnswer from "@components/Question/Answer/ResultMultiAnswer";
  import FooterQuestion from "@components/Question/FooterQuestion";
  import { mapState } from 'vuex';

  export default {
    props: {
      question: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        mixedAnswer: [],
        userSingleAnswer: '',
        userMultiAnswer: []
      }
    },
    computed: {
      ...mapState('question', {
        submitClick: 'submitClick',
        selectedAnswer: 'selectedAnswer'
      })
    },
    watch: {
      "question"() {
        this.$store.commit('question/unsubmitClicked');
        this.mixedAnswer = this._.shuffle(this.question.answers);
      }
    },
    methods: {
      //submitClicked
      submit() {
        this.$store.commit('question/submitClicked');
      },
      //  Get User Answer
      getUserAnswer(answer) {
        this.userSingleAnswer = answer;
      },
      getUserMultiAnswers(answers) {
        this.userMultiAnswer = answers;
      }
    },
    components: {
      TitleQuestion,
      SingleAnswer,
      MultiAnswer,
      ResultSingleAnswer,
      ResultMultiAnswer,
      FooterQuestion
    },
    mounted() {
      this.mixedAnswer = this._.shuffle(this.question.answers);
    }
  }

</script>

<style scoped>

</style>

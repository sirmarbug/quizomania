<template>
  <div>
    <form action="#" @submit.prevent="submit">

      <!-- TITLE -->
      <title-question class="title-question" :title="question.question"
                      :alert="question.goodAnswers[0] === '' || question.goodAnswers.length === 0"></title-question>

      <!-- BODY -->
      <single-answer :answers="ans" :goodAnswer="question.goodAnswers[0]" @getUserAnswer="getUserAnswer"
                     v-if="question.goodAnswers.length === 1" v-show="!sub"></single-answer>
      <result-single-answer :answers="ans" :goodAnswer="question.goodAnswers[0]" :userAnswer="userAnswer"
                            v-if="question.goodAnswers.length === 1" v-show="sub"></result-single-answer>
      <multi-answer :answers="ans" :goodAnswers="question.goodAnswers" @getUserMultiAnswers="getUserMultiAnswers"
                    v-if="question.goodAnswers.length > 1" v-show="!sub"></multi-answer>
      <result-multi-answer :answers="ans" :goodAnswers="question.goodAnswers" :userAnswers="userMultiAnswer"
                           v-if="question.goodAnswers.length > 1" v-show="sub"></result-multi-answer>

      <!-- FOOTER -->
      <footer-question class="footer-question"
                       :disabled="!odp || sub || question.goodAnswers[0] === '' || question.goodAnswers.length === 0"></footer-question>
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
  import { mapGetters, mapState } from 'vuex';

  export default {
    props: {
      question: {
        type: Object,
        required: true
      },
      exam: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {
        // odp: "",
        // odp2: [],
        // ok: false,
        // sub: false,
        ans: [],
        userAnswer: '',
        userMultiAnswer: []
      }
    },
    computed: {
      ...mapState('question', {
        submitClick: 'submitClick',
        selectedAnswer: 'selectedAnswer'
      }),
      odp() {
        return this.$store.state.question.selectedAnswer;
      },
      sub() {
        return this.$store.state.question.submitClick;
      }
    },
    watch: {
      "question"() {
        // this.odp2 = [];
        // this.ok = false;
        // this.sub = false;
        this.$store.commit('question/unsubmitClicked');
        this.ans = this._.shuffle(this.question.answers);
      }
    },
    methods: {
      //submitClicked
      submit() {
        this.$store.commit('question/submitClicked');
      },
      //  Get User Answer
      getUserAnswer(answer) {
        this.userAnswer = answer;
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
      this.ans = this._.shuffle(this.question.answers);
    }
  }

</script>

<style scoped>

</style>

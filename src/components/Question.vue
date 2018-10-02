<template>
  <!-- SINGLE ANSWER -->
  <div v-if="question.goodAnswers.length <= 1">
    <form action="#" @submit.prevent="submit">

      <!-- TITLE -->
       <title-question class="title-question" :title="question.question" :alert="question.goodAnswers[0] === '' || question.goodAnswers.length === 0"></title-question>
      <!-- BODY -->
       <single-answer :answers="ans" :goodAnswer="question.goodAnswers[0]" @getUserAnswer="getUserAnswer" v-if="question.goodAnswers.length === 1 && !sub"></single-answer>
      <result-single-answer :answers="ans" :goodAnswer="question.goodAnswers[0]" :userAnswer="userAnswer" v-if="question.goodAnswers.length === 1 && sub"></result-single-answer>
      <!-- FOOTER -->
       <footer-question class="footer-question" :disabled="!odp || sub || question.goodAnswers[0] === '' || question.goodAnswers.length === 0"></footer-question>
    </form>
  </div>

  <!-- MULTI ANSWER -->
  <div v-else>
    <form action="#" @submit.prevent="submit">
      <h5 class="title-question">{{ question.question }}</h5>
      <p v-for="ans in question.answers" :key="ans">
          <b-form-group>
            <b-form-checkbox-group v-model="odp2">
              <b-form-checkbox :value="ans" :disabled="sub">
                <span :class="{'good': checkedGood(ans), 'bad': checkedBad(ans)}">{{ ans }}</span>
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
      </p>
      <div class="footer-question">
        <b-button type="submit" variant="outline-secondary" :disabled="odp2.length === 0 || sub">Sprawdź</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import TitleQuestion from "@components/Question/TitleQuestion";
import SingleAnswer from "@components/Question/Answer/SingleAnswer";
import ResultSingleAnswer from "@components/Question/Answer/ResultSingleAnswer";
import FooterQuestion from "@components/Question/FooterQuestion";
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
        odp2: [],
        ok: false,
        // sub: false,
        ans: [],
        userAnswer: ''
      }
    },
    computed: {
      odp() {
        return this.$store.state.question.selectedAnswer;
      },
      sub() {
        return this.$store.state.question.submitClick;
      }
    },
    watch: {
      "question"() {
        this.odp2 = [];
        this.ok = false;
        // this.sub = false;
        this.$store.commit('question/unsubmitClicked');
        this.ans = this._.shuffle(this.question.answers);
      }
    },
    methods: {
      //submitClicked
      submit() {
        // this.$log.debug("Count = ", this.$store.state.count);
        // this.$store.commit("increment");
        // this.$log.debug("Count = ", this.$store.state.count);
        this.$store.commit('question/selected');
        this.$store.commit('question/submitClicked');
        if (this.question.goodAnswers.length === 1) {
          // if (this.odp === this.question.goodAnswers[0]) {
          //   this.ok = true;
          // } else {
          //   this.ok = false;
          // }
        } else {
          let good = 0;
          for (let i = 0; i < this.odp2.length; i++) {
            for (let j = 0; j < this.question.goodAnswers.length; j++) {
              if (this.odp2[i] === this.question.goodAnswers[j]) {
                good++;
              }
            }
          }
          if (this.question.goodAnswers.length === good && this.odp2.length === good) {
            this.ok = true;
          } else {
            this.ok = false;
          }
        }
        this.$emit("submitAnswer", this.ok);
      },
      //Checked good answer
      checkedGood(val) {
        if (this.sub && !this.exam) {
          for (let j = 0; j < this.question.goodAnswers.length; j++) {
            if (this.question.goodAnswers[j] === val) {
              return true;
            }
          }
        }
        return false;
      },
      //Checked bad answer
      checkedBad(val) {
        let odp = false;
        if (this.sub && !this.exam) {
          for (let i = 0; i < this.odp2.length; i++) {
            for (let j = 0; j < this.question.goodAnswers.length; j++) {
              if (this.odp2[i] === val) {
                if (this.odp2[i] === this.question.goodAnswers[j]) {
                  odp = true;
                }
              }
            }
            if (this.odp2[i] === val && !odp) {
              return true;
            }
          }
        }
        return false;
      },
    //  Get User Answer
      getUserAnswer(answer) {
        this.userAnswer = answer;
      }
    },
    components: {
      TitleQuestion,
      SingleAnswer,
      ResultSingleAnswer,
      FooterQuestion
    },
    mounted() {
      // this.$log.debug(this.exam);
      this.ans = this._.shuffle(this.question.answers);
    }
  }

</script>

<style>
  .good,
  .bad {
    margin: 0;
    padding: 0;
  }

  .good {
    background: #77ddd4;
    color: #2c3e50;
  }

  .bad {
    background: #efb1b3;
    color: #2c3e50;
  }

</style>

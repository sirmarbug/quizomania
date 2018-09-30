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
        <question class="question" :question="db[ques[nr - 1]]" :exam="$route.name === 'exam'" @submitAnswer="submitAnswer"></question>
        <b-button variant="outline-secondary" v-if="nr < count" @click="next">Następny</b-button>
        <b-button variant="outline-secondary" v-if="nr === count" @click="stop">Zakończ</b-button>
      </div>
      <!-- RESULT -->
      <div v-if="count === nr && end">
        <exam-result :goodAns="goodAns" :badAns="badAns" :allAns="count"></exam-result>
        <b-button variant="outline-secondary" @click="newExam">Nowy egzamin</b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import questions from "@/utils/question.js";
  import Question from "@components/Question";
  import ExamResult from "@components/ExamResult";

  export default {
    data() {
      return {
        db: [],
        ques: [],
        count: null,
        isCount: false,
        nr: 1,
        end: false,
        goodAns: 0,
        badAns: 0,
        q: []
      }
    },
    watch: {},
    methods: {
      start() {
        let rand = 0;
        let rep = false;
        while (this.ques.length < this.count) {
          rep = false;
          rand = Math.floor(Math.random() * this.db.length);
          if (rand < this.db.length) {
            for (let i = 0; i < this.ques.length; i++) {
              if (this.ques[i] === rand) {
                rep = true;
                break;
              }
            }
            if (!rep) {
              this.ques.push(rand);
            }
          }
        }

        for (let i = 0; i < this.ques.length; i++) {
          this.q.push(this.db[this.ques[i]]);
        }
        // this.$log.debug(this.q);
        this.isCount = true;
      },
      next() {
        this.nr++;
      },
      stop() {
        this.end = true;
      },
      submitAnswer(ans) {
        if (ans) this.goodAns++;
        else this.badAns++;
      },
      newExam() {
        this.ques = [];
        this.count = null;
        this.isCount = false;
        this.nr = 1;
        this.end = false;
        this.goodAns = 0;
        this.badAns = 0;
      }
    },
    components: {
      Question,
      ExamResult,
    },
    mounted() {
      // QUESTION MODE
      this.$store.commit('question/setMode', this.$route.name);
      for (let i = 0; i < questions.length - 1; i++) {
        if (questions[i].goodAnswers.length > 0 && questions[i].goodAnswers[0] !== "") {
          this.db.push(questions[i]);
        }
      }
      // this.$log.debug("Wartość route: ", this.$route);
    }
  }

</script>

<style scoped>
</style>

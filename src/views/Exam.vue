<template>
  <div>
    <h1>Test</h1>
    <div v-if="!isCount">
        <div class="input-field">
          <input placeholder="Count" id="first_name" type="text" class="validate" v-model.number="count">
        </div>
        <button class="waves-effect waves-light btn" @click="start">Start</button>
    </div>
    <div v-if="isCount && !end">
        <question :question="db[ques[nr - 1]]" :exam="$route.name === 'exam'" @submitAnswer="submitAnswer"></question>
        <button class="waves-effect waves-light btn" v-if="nr < count" @click="next">Następny</button>
        <button class="waves-effect waves-light btn" v-if="nr === count" @click="stop">Zakończ</button>
    </div>
    <div v-if="count === nr && end">
      <exam-result :goodAns="goodAns" :badAns="badAns" :allAns="count"></exam-result>
      <button class="waves-effect waves-light btn" @click="newExam">Nowy egzamin</button>
      <!-- <question-result-exam v-for="que in q" :key="que.question" :question="que"></question-result-exam> -->
    </div>
  </div>
</template>

<script>
  import questions from "@/utils/questions.js";
  import Question from "@components/Question";
  import ExamResult from "@components/ExamResult";
  import QuestionResultExam from '@components/QuestionResultExam';

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
    watch: {
    },
    methods: {
        start() {
            let rand = 0;
            let rep = false;
            while(this.ques.length < this.count) {
                rep = false;
                rand = Math.floor(Math.random() * this.db.length);
                if (rand < this.db.length) {
                    for(let i = 0; i < this.ques.length; i++) {
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

            for(let i = 0; i < this.ques.length; i++ ) {
              this.q.push(this.db[this.ques[i]]);
            }
            this.$log.debug(this.q);
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
        QuestionResultExam
    },
    mounted() {
        for(let i = 0; i < questions.length - 1; i++){
            if (questions[i].goodAnswers.length > 0 && questions[i].goodAnswers[0] !== "") {
                this.db.push(questions[i]);
            }
        }
        this.$log.debug("Wartość route: ", this.$route);
    }
  }

</script>

<style scoped>
</style>

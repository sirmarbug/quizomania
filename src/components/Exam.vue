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
        <question :question="db[ques[nr - 1]]" :exam="true"></question>
        <button class="waves-effect waves-light btn" v-if="nr < count" @click="next">Następny</button>
        <button class="waves-effect waves-light btn" v-if="nr === count" @click="stop">Zakończ</button>
    </div>
    <div v-if="count === nr && end">
      <h2>Koniec</h2>
    </div>
  </div>
</template>

<script>
  import questions from "../questions.js";
  import Question from "./Question";

  export default {
    data() {
      return {
            db: [],
            ques: [],
            count: null,
            isCount: false,
            nr: 1,
            end: false
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
            this.isCount = true;
        },
      next() {
        this.nr++;
      },
      stop() {
        this.end = true;
      }
    },
    components: {
        Question
    },
    mounted() {
        for(let i = 0; i < questions.length - 1; i++){
            if (questions[i].goodAnswers.length > 0 && questions[i].goodAnswers[0] !== "") {
                this.db.push(questions[i]);
            }
        }
    }
  }

</script>

<style scoped>
</style>

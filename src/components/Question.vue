<template>
  <div v-if="question.goodAnswers.length <= 1">
    <form action="#" @submit.prevent="submit">
      <h5 class="alert" v-if="question.goodAnswers[0] === '' || question.goodAnswers.length === 0">Pytanie nie posiada odpowiedzi!!!</h5>
      <h5>{{ question.question }}</h5>
      <p v-for="answer in ans" :key="answer">
        <label>
          <input name="group1" type="radio" :value="answer" :disabled="sub || question.goodAnswers[0] === '' || question.goodAnswers.length === 0" v-model="odp" />
          <span :class="{'good': sub && answer === question.goodAnswers[0] && !exam, 'bad': sub && answer !== question.goodAnswers[0] && odp === answer  && !exam}">{{ answer }}</span>
        </label>
      </p>
      <button type="submit" class="waves-effect waves-light btn" :disabled="!odp || sub || question.goodAnswers[0] === '' || question.goodAnswers.length === 0">Sprawdź</button>
    </form>
  </div>
  <div v-else>
    <form action="#" @submit.prevent="submit">
      <h5>{{ question.question }}</h5>
      <p v-for="ans in question.answers" :key="ans">
        <label>
          <input type="checkbox" class="filled-in" :value="ans" :disabled="sub" v-model="odp2" />
          <span :class="{'good': checkedGood(ans), 'bad': checkedBad(ans)}">{{ ans }}</span>
        </label>
      </p>
      <!-- <div class="result">
        <div v-if="ok && sub">
          <h5 class="center-align good">Poprawna odpowiedź</h5>
        </div>
        <div v-if="!ok && sub">
          <h5 class="center-align bad">Błędna odpowiedź! Poprawna to:
            <span v-for="ans in question.goodAnswers" :key="ans">{{ ans }} </span>
          </h5>
        </div>
      </div> -->
      <button type="submit" class="waves-effect waves-light btn" :disabled="odp2.length === 0 || sub">Sprawdź</button>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      question: {
        type: Object
      },
      exam: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        odp: "",
        odp2: [],
        ok: false,
        sub: false,
        ans: []
      }
    },
    watch: {
      // "$route" () {
      //   this.odp = "";
      //   this.odp2 = [];
      //   this.ok = false;
      //   this.sub = false;
      //   this.ans = this._.shuffle(this.question.answers);
      // },
      "question"() {
        this.odp = "";
        this.odp2 = [];
        this.ok = false;
        this.sub = false;
        this.ans = this._.shuffle(this.question.answers);
      }
    },
    methods: {
      submit() {
        this.sub = true;
        if (this.question.goodAnswers.length === 1) {
          if (this.odp === this.question.goodAnswers[0]) {
            this.ok = true;
          } else {
            this.ok = false;
          }
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
      checkedBad(val) {
        let odp = false;
        if (this.sub  && !this.exam) {
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
      }
    },
    mounted() {
      console.log(this.exam);
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

  .alert {
    color: #b71c1c
  }

</style>

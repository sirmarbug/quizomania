<template>
  <div v-if="question.goodAnswers.length === 1">
    <form action="#" @submit.prevent="submit">
      <h1>{{ question.question }}</h1>
      <p v-for="answer in question.answers" :key="answer">
        <label>
          <input name="group1" type="radio" :value="answer" v-model="odp" />
          <span>{{ answer }}</span>
        </label>
      </p>
      <div class="result">
        <div v-if="ok && sub">
          <h5 class="center-align good">Poprawna odpowiedź</h5>
        </div>
        <div v-if="!ok && sub">
          <h5 class="center-align bad">Błędna odpowiedź! Poprawna to:
            <span v-for="ans in question.goodAnswers" :key="ans">{{ ans }}</span>
          </h5>
        </div>
      </div>
      <button type="submit" class="waves-effect waves-light btn" :disabled="!odp">Sprawdź</button>
    </form>
  </div>
  <div v-else>
    <form action="#" @submit.prevent="submit">
      <h1>{{ question.question }}</h1>
      <p v-for="ans in question.answers" :key="ans">
        <label>
          <input type="checkbox" class="filled-in" :value="ans" v-model="odp2"/>
          <span>{{ ans }}</span>
        </label>
      </p>
      <div class="result">
        <div v-if="ok && sub">
          <h5 class="center-align good">Poprawna odpowiedź</h5>
        </div>
        <div v-if="!ok && sub">
          <h5 class="center-align bad">Błędna odpowiedź! Poprawna to:
            <span v-for="ans in question.goodAnswers" :key="ans">{{ ans }} </span>
          </h5>
        </div>
      </div>
      <button type="submit" class="waves-effect waves-light btn" :disabled="odp2.length === 0">Sprawdź</button>
    </form>
  </div>
</template>

<script>
  export default {
    props: ["question"],
    data() {
      return {
        odp: "",
        odp2: [],
        ok: false,
        sub: false
      }
    },
    watch: {
      "$route" () {
        this.odp = "";
        this.odp2 = [];
        this.ok = false;
        this.sub = false;
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
          for(let i = 0; i < this.odp2.length; i++) {
            for(let j = 0; j < this.question.goodAnswers.length; j++) {
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
      }
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
    background: #26a69a;
  }

  .bad {
    background: #ee6e73;
  }

  .result {
    min-height: 50px;
  }

</style>

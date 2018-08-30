<template>
  <div>
    <h4>Pytanie {{ this.id }}</h4>
    <question :question="questions[id - 1]" @submitAnswer="submitAnswer"></question>
    <statistics :goodAns="goodAns" :badAns="badAns" :allAns="allAns"></statistics>
    <button class="waves-effect waves-light btn" :disabled="id <= 1" @click="prevQuerstion">Poprzednie</button>
    <button class="waves-effect waves-light btn" :disabled="id >= questions.length - 1" @click="nextQuestion">Następne</button>
  </div>
</template>

<script>

import Question from "./Question";
import Statistics from "./Statistics";
import questions from "../questions.js";

export default {
  data () {
    return {
      questions: questions,
      id: Number(this.$route.params.id),
      goodAns: 0,
      badAns: 0,
      allAns: 0
    }
  },
  watch: {
    "$route"() {
      this.id = Number(this.$route.params.id)
    }
  },
  methods: {
    prevQuerstion() {
      if (this.id > 0) {
        this.$router.push(`/${this.id - 1}`);
      }
    },
    nextQuestion() {
      if (this.id < this.questions.length - 1) {
        this.$router.push(`/${this.id + 1}`);
      }
    },
    submitAnswer(ans) {
      this.allAns++;
      if (ans) this.goodAns++; else this.badAns++;
    }
  },
  components: {
    Question,
    Statistics
  }
}
</script>

<style scoped>
div {
  margin-bottom: 20px;
}
</style>

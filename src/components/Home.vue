<template>
  <div>
    <question :question="questions[id - 1]"></question>
    <button class="waves-effect waves-light btn" :disabled="id <= 1" @click="prevQuerstion">Poprzednie</button>
    <button class="waves-effect waves-light btn" :disabled="id >= questions.length - 1" @click="nextQuestion">Następne</button>
  </div>
</template>

<script>

import Question from "./Question";
import questions from "../questions.js";

export default {
  data () {
    return {
      questions: questions,
      id: Number(this.$route.params.id)
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
  },
  components: {
    Question
  }
}
</script>

<style scoped>
div {
  margin-bottom: 20px;
}
</style>

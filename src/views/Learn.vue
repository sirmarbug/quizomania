<template>
  <div class="row row-first align-items-center">
    <div class="col-sm">
      <h4>{{ $t("question") }} {{ id }}/{{ questionCount }}</h4>
      <question class="question" :question="questions[id - 1]" :exam="$route.name === 'exam'" @submitAnswer="submitAnswer"></question>
      <b-button variant="outline-secondary" :disabled="id <= 1" @click="prevQuerstion">Poprzednie</b-button>
      <b-button variant="outline-secondary" :disabled="id >= questions.length" @click="nextQuestion">Następne</b-button>
      <statistics :goodAns="goodAns" :badAns="badAns" :allAns="allAns"></statistics>
    </div>
  </div>
</template>

<script>
  import Question from "@components/Question";
  import Statistics from "@components/Statistics";
  import questions from "@/utils/question.js";

  export default {
    data() {
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
        if (Number(this.$route.params.id) < 1) {
          this.$router.push(`/learn/1`);
        }
        this.id = Number(this.$route.params.id)
      }
    },
    computed: {
      questionCount() {
        return this.questions.length;
      }
    },
    methods: {
      prevQuerstion() {
        if (this.id > 0) {
          this.$router.push(`/learn/${this.id - 1}`);
        }
      },
      nextQuestion() {
        if (this.id < this.questions.length) {
          this.$router.push(`/learn/${this.id + 1}`);
        }
      },
      submitAnswer(ans) {
        // this.$log.debug("Język: ", this.$i18n.locale);
        // this.$i18n.locale = "de";
        // this.$log.debug("Język: ", this.$i18n.locale);
        this.allAns++;
        if (ans) this.goodAns++;
        else this.badAns++;
      }
    },
    components: {
      Question,
      Statistics
    },
    mounted() {
      if (Number(this.$route.params.id) < 1) {
        this.$router.push(`/learn/1`);
      }
      this.id = Number(this.$route.params.id);
      // QUESTION MODE
      this.$store.commit('question/setMode', this.$route.name);
    }
  }

</script>

<style scoped>
</style>

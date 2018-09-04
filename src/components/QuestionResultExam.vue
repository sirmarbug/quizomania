<template>
  <div>
    <h5>{{ question.question }}</h5>
    <p v-for="ans in question.answers" :key="ans" :class="{ 'good': checkedGood(ans) }">{{ ans }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      question: {
        type: Object
      }
    },
    data() {
      return {

      }
    },
    watch: {},
    methods: {
      checkedGood(val) {
        for (let j = 0; j < this.question.goodAnswers.length; j++) {
          if (this.question.goodAnswers[j] === val) {
            return true;
          }
        }
      },
      checkedBad(val) {

      }
    }
  }

</script>

<style scoped>
  .good {
    background: #77ddd4;
    color: #2c3e50;
  }

  .bad {
    background: #efb1b3;
    color: #2c3e50;
  }

</style>

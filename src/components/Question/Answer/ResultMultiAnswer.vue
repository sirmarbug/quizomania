<template>
  <div>
    <p v-for="answer in answers" :key="answer" :class="{'good-answer': checkedGood(answer), 'bad-answer': checkedBad(answer)}">
      {{ answer }}
    </p>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex';

  export default {
    name: "ResultMultiAnswer",
    props: {
      answers: {
        type: Array,
        required: true
      },
      goodAnswers: {
        type: Array,
        required: true
      },
      userAnswers: {
        type: Array,
        required: true
      }
    },
    computed: {
      ...mapState('question', {
        submitClick: 'submitClick'
      }),
      ...mapGetters('question', {
        exam: 'examMode'
      }),
      ...mapState('exam', {
        examResult: 'result'
      }),
    },
    methods: {
//Checked good answer
      checkedGood(val) {
        if ((this.submitClick && !this.exam) || this.examResult) {
          for (let j = 0; j < this.goodAnswers.length; j++) {
            if (this.goodAnswers[j] === val) {
              return true;
            }
          }
        }
        return false;
      },
      //Checked bad answer
      checkedBad(val) {
        let odp = false;
        if ((this.submitClick && !this.exam) || this.examResult) {
          for (let i = 0; i < this.userAnswers.length; i++) {
            for (let j = 0; j < this.goodAnswers.length; j++) {
              if (this.userAnswers[i] === val) {
                if (this.userAnswers[i] === this.goodAnswers[j]) {
                  odp = true;
                }
              }
            }
            if (this.userAnswers[i] === val && !odp) {
              return true;
            }
          }
        }
        return false;
      },
    }
  }
</script>

<style scoped>

</style>

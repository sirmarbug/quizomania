<template>
  <b-form-group>
    <b-form-radio-group v-model="selectedSingleAnswer">
      <p v-for="answer in answers" :key="answer">
        <b-form-radio :value="answer"
                      :disabled="submitClick || goodAnswer === ''">
          <span
            :class="{'good-answer': submitClick && answer === goodAnswer && !exam, 'bad-answer': submitClick && answer !== goodAnswer && selectedSingleAnswer === answer  && !exam}">{{ answer }}</span>
        </b-form-radio>
      </p>
    </b-form-radio-group>
  </b-form-group>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    props: {
      answers: {
        type: Array,
        required: true
      },
      goodAnswer: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        selectedSingleAnswer: ''
      }
    },
    computed: {
      ...mapState('question', {
        submitClick: 'submitClick'
      }),
      ...mapGetters('question', {
        exam: 'examMode'
      })
    },
    watch: {
      'answers'() {
        this.selectedSingleAnswer = '';
      },
      'selectedSingleAnswer'() {
        this.$store.commit('question/selected');
        if(!this.exam) {
          this.$emit('getUserAnswer', this.selectedSingleAnswer);
        }
      },
      'submitClick'() {
        if (this.submitClick) {
          this.$store.commit('statistics/incrementAllAnswers');
          if (this.selectedSingleAnswer === this.goodAnswer) {
            this.$store.commit('statistics/incrementGoodAnswers');
          } else {
            this.$store.commit('statistics/incrementBadAnswers');
          }
          if (this.exam) {
            this.$store.commit('exam/addAnswer', this.selectedSingleAnswer);
          }
        }
      }
    }
  }

</script>

<style scoped>
</style>

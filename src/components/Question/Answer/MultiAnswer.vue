<template>
  <div>
    <p v-for="answer in answers" :key="answer">
      <b-form-group>
        <b-form-checkbox-group v-model="selectedMultiAnswers">
          <b-form-checkbox :value="answer" :disabled="submitClick">
            <span>{{ answer }}</span>
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </p>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: "MultiAnswer",
    props: {
      answers: {
        type: Array,
        required: true
      },
      goodAnswers: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedMultiAnswers: []
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
        this.selectedMultiAnswers = [];
      },
      'selectedMultiAnswers'() {
        if (this.selectedMultiAnswers.length > 0) {
          this.$store.commit('question/selected');
        } else {
          this.$store.commit('question/unselected');
        }
        if(!this.exam) {
          this.$emit('getUserMultiAnswers', this.selectedMultiAnswers);
        }
      },
      'submitClick'() {
        if (this.submitClick) {
          this.$store.commit('statistics/incrementAllAnswers');
          let good = 0;
          for (let i = 0; i < this.selectedMultiAnswers.length; i++) {
            for (let j = 0; j < this.goodAnswers.length; j++) {
              if (this.selectedMultiAnswers[i] === this.goodAnswers[j]) {
                good++;
              }
            }
          }
          if (this.goodAnswers.length === good && this.selectedMultiAnswers.length === good) {
            this.$store.commit('statistics/incrementGoodAnswers');
          } else {
            this.$store.commit('statistics/incrementBadAnswers');
          }
          if (this.exam) {
            this.$store.commit('exam/addAnswer', this.selectedMultiAnswers);
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>

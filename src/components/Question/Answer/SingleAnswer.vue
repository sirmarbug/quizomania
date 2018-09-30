<template>
  <b-form-group>
    <b-form-radio-group v-model="selectedSingleAnswer">
      <p v-for="answer in answers" :key="answer">
        <b-form-radio :value="answer"
                      :disabled="submitClick || goodAnswers === ''">
          <span
            :class="{'good': submitClick && answer === goodAnswers && !exam, 'bad': submitClick && answer !== goodAnswers && selectedSingleAnswer === answer  && !exam}">{{ answer }}</span>
        </b-form-radio>
      </p>
    </b-form-radio-group>
  </b-form-group>
</template>

<script>
  import { mapGetters } from 'vuex';

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
      submitClick() {
        return this.$store.state.question.submitClick;
      },
      ...mapGetters('question', {
        exam: 'examMode'
      })
    },
    watch: {
      'selectedSingleAnswer'() {
        this.$store.commit('question/selected');
      },
      'submitClick'() {

      }
    },
    methods: {

    },
    mounted() {
      this.$log.debug('Exam Mode: ', this.exam);
    }
  }

</script>

<style scoped>
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
</style>

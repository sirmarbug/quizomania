<template>
  <div>
    <h5>Statystyki</h5>
    <p>Poprawne: {{ goodAnswers }}</p>
    <p>Błędne: {{ badAnswers }}</p>
    <p>Łącznie: {{ allAnswers }}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    computed: {
      ...mapState('statistics', {
        allAnswers: state => state.allAnswers,
        goodAnswers: state => state.goodAnswers,
        badAnswers: state => state.badAnswers,
      })
    }
  }
</script>

<style scoped>
</style>

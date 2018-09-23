<template>

</template>

<script>
  export default {
    props: {
      answers: {
        type: Array,
        required: true
      },
      goodAnswers: {
        type: Array,
        required: true
      },
      submitClick: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        selectedAnswer: ''
      }
    },
    methods: {
    }
  }

</script>

<style scoped>

</style>

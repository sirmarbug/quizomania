<template>
  <div>
    <h5>Statystyki</h5>
    <p>Poprawne: {{ goodAns }}</p>
    <p>Błędne: {{ badAns }}</p>
    <p>Łącznie: {{ allAns }}</p>
  </div>
</template>

<script>
export default {
  props: ["goodAns", "badAns", "allAns"],
  data () {
    return {

    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

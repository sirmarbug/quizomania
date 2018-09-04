<template>
  <div>
    <h5>Wynik</h5>
    <h6 :class="{ 'good-mark': mark >= 50, 'bad-mark': mark < 50 }">Ocena: {{ mark }}</h6>
    <p>Poprawne: {{ goodAns }}</p>
    <p>Błędne: {{ badAns }}</p>
  </div>
</template>

<script>

export default {
  props: {
    goodAns: {
      type: Number
    },
    badAns: {
      type: Number
    },
    allAns: {
      type: Number
    }
  },
  data () {
    return {
      mark: 0
    }
  },
  watch: {
  },
  methods: {
  },
  mounted() {
    this.mark = this.goodAns / this.allAns * 100;
  }
}
</script>

<style scoped>
.good-mark {
  color: green;
}

.bad-mark {
  color: red;
}
</style>

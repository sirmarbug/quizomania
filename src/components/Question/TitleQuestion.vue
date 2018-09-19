<template>
  <div>
    <h5>{{ title }}</h5>
    <b-alert variant="danger" show v-if="alert">Pytanie nie posiada odpowiedzi!!!</b-alert>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: "",
        required: true
      },
      alert: {
        type: Boolean,
        default: false,
        required: true
      }
    }
  }

</script>

<style scoped>

</style>

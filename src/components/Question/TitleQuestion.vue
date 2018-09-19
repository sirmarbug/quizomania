<template>
  <div>
    <b-alert variant="danger" show v-if="alert">Pytanie nie posiada odpowiedzi!!!</b-alert>
    <h5>{{ title }}</h5>
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

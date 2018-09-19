<template>
  <div>
    <b-button type="submit" variant="outline-secondary" :disabled="disabled">Sprawdź</b-button>
  </div>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false,
        required: true
      }
    }
  }

</script>

<style scoped>

</style>

<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Quizomania</a>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  import Home from "./components/Home";

  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {
      Home
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>

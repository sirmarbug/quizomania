<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#/">QUIZOMANIA</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#/learn/1">Nauka</b-nav-item>
          <b-nav-item href="#/exam">Test</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
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

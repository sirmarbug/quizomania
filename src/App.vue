<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#/">QUIZOMANIA</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#/learn/1">Nauka</b-nav-item>
          <b-nav-item href="#/exam">Test</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view />
    <!-- <footer class="page-footer">
      <div class="footer-copyright">
        <div class="container">
          Aplikacja powstała dla mojego cudownego Kotusia ;*
          <span class="grey-text text-lighten-4 right">Autor: Mariusz Bugajski</span>
        </div>
      </div>
    </footer> -->
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

  .page-footer {
    padding: 0;
  }

  @media only screen and (min-width: 480px) {
    .page-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }

</style>

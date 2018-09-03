<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#/" class="brand-logo center">Quizomania</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li>
            <a href="#/learn/1">Nauka</a>
          </li>
          <li>
            <a href="#/exam">Test</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
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

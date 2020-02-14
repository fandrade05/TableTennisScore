<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a href="" class="navbar-brand">CONTADOR TDM</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/scoreboard" class="nav-link">Partido</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/controlpanel" class="nav-link">Consola</router-link>
        </li>
      </ul>
    </nav>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
  /*import controlpanel from "./components/ControlPanel";
  import scoreboard from "./components/ScoreBoard";*/

  export default {
    name: 'App'/*,
    components: { controlpanel, scoreboard}*/
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

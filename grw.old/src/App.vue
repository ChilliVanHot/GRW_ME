<template>
  <div id="app">
    <img src="./assets/grw-logo.png">
  <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
 </template>

<script>


import infiniteLoading from './components/infiniteLoading.vue'
//import {ClientTable} from 'vue-tables-2';

export default {
  name: 'app',
  components: {
    infiniteLoading
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
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <img src="./assets/grw-logo.png">
    <div class="scroller-in-page-area">
      
     
        </div>
  </div>
  </template>

<script>


import InfiniteLoading from 'vue-infinite-loading';





export default {
  components: {
    InfiniteLoading,
  },
};
</script>

<style>
.scroller-in-page-area {overflow:'hidden'}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

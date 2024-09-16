<template>
  <div id="app">
  <HeaderView/>
    
    <router-view></router-view>
    <!-- <FileDIfferenceNew/> -->
    <FooterView />
    
   
  </div>
</template>

<script>
import HeaderView from './views/HeaderView.vue';

import FooterView from './views/FooterView.vue';


export default {
  name: 'App',
  components: {
    FooterView,
    HeaderView  
    
  }
  
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */

}


</style>

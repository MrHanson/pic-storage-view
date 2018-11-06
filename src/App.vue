<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>
import home from "@/views/home.vue";

export default {
  name: "app",
  components: {
    home
  }
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>

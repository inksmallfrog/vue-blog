<template>
  <div id="app">
    <navigator></navigator>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigator from './components/Navigator.vue'

export default {
  name: 'app',
  components: {
    Navigator
  }
}
</script>

<style>
  @import 'styles/iconfont.css';
</style>

<style scoped>
  @import 'styles/_styleVariables.css';
  body{
    background: var(--backgroundColor);
  }
  .main{
    margin-left: var(--navWidth);
    margin-right: var(--mainMarginRight);
    padding: var(--mainPadding);
  }
</style>

<template>
  <div id="app">
    <div v-if="!$route.path.includes('/callback/')">
    <CommonNavBar/>
    </div>
    <div id="content" class="align-content-center">
          <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CommonNavBar from './components/layout/CommonNavBar.vue'

export default {
  name: 'App',
  components: {
    CommonNavBar,
  }
}
</script>

<style>
@font-face {
  font-family: 'BMJUA';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'BMHANNAAir';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>

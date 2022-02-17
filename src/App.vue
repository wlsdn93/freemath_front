<template>
  <div id="app">
    <div v-if="$route.path === '/'">
      <welcome></welcome>
    </div>
    <div v-if="$route.path !== '/'">
      <div v-if="!$route.path.includes('/problems/') && !$route.path.includes('/callback/')" class="common-navbar">
        <CommonNavBar/>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CommonNavBar from './components/layout/CommonNavBar.vue'
import Welcome from "@/views/Welcome";

export default {
  name: 'App',
  components: {
    CommonNavBar,
    Welcome
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
#app {
}
.content {
  margin-left: auto;
  margin-right: auto;
  min-width: 800px;
  max-width: 1500px;
}
.common-navbar {
  margin-left: auto;
  margin-right: auto;
  min-width: 800px;
  max-width: 1500px;
}
</style>

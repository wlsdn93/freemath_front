<template>
  <div id="app">
    <div v-if="!$route.path.includes('/callback/')">
    <CommonNavBar/>
    </div>
    <div id="content" class="align-content-center">
      <div class="d-flex bd-highlight">
        <div class="p-2 flex-fill bd-highlight">
          <router-view></router-view>
        </div>
      </div>
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

</style>

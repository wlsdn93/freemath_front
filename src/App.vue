<template>
  <div id="app">
    <Header/>
    <div id="content" class="content">
      <div class="d-flex bd-highlight">
        <div class="p-2 flex-fill bd-highlight">
          <router-view></router-view>
        </div>
<!--        <div class="p-2 flex-fill bd-highlight">-->
<!--          <span></span>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>

</style>

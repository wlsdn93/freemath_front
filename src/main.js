import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin

import axios from 'axios'
import VueAxios from "vue-axios"
import vuex from 'vuex'
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.params = {}
Vue.use(vuex)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

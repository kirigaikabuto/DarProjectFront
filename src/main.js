import Vue from 'vue'
import App from './App.vue'
import './assets/styles/styles.scss'
import router from "./router/router"
import store from "./vuex/store"
Vue.config.productionTip = false
require('../node_modules/bootstrap/dist/css/bootstrap.css')

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')

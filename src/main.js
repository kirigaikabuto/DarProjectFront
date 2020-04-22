import Vue from 'vue'
import App from './App.vue'
import './assets/styles/styles.scss'
import router from "./router/router"
import store from "./vuex/store"
Vue.config.productionTip = false
require('../node_modules/bootstrap/dist/css/bootstrap.css');
import 'videojs-contrib-hls'
const hls = require('videojs-contrib-hls');
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(hls)
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')

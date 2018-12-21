// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import VueTimeago from 'vue-timeago'

import 'ant-design-vue/dist/antd.css'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App'
import TwitterFeed from './components/TwitterFeed'

import router from './router'
import store from './store'

Vue.use(Loading)
Vue.use(VueTimeago)

Vue.config.productionTip = false
Vue.component('twitter-feed', TwitterFeed)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

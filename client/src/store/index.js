import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import createLogger from '../utils/logger'

import feeds from './modules/feeds'

import * as state from './state'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

const vuexPersist = new VuexPersist({
  key: 'twitter-feed',
  storage: window.localStorage,
  reducer: state => ({ settings: state.default.settings })
})

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    feeds
  },
  plugins: process.env.NODE_ENV === 'development' ? [createLogger, vuexPersist.plugin] : [vuexPersist.plugin]
})

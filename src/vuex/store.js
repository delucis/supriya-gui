// import and set-up Vue + Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import store_server_status from './modules/store_server_status.js'
import store_server_meters from './modules/store_server_meters.js'
import store_server_tree   from './modules/store_server_tree.js'
import store_synthdefs     from './modules/store_synthdefs.js'

// create Vuex store using appData
export default new Vuex.Store({
  modules: {
    server_status: store_server_status,
    server_meters: store_server_meters,
    server_tree: store_server_tree,
    synthdefs: store_synthdefs
  }
})

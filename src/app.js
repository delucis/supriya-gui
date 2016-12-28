// import styling to normalize defaults across browsers
require('normalize.css');

// import and set-up Vue
import Vue from 'vue'

// import app components/structure from <App> Vue.js component
import App from './App.vue'

// import Vuex store
import store from './vuex/store.js'

// bind Vue instance to div#app and render it as <App>
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})


/*
    MOCK UP SOME DATA INPUT
*/
// import dummy data
import appData from './supriya-dummy-1.json'

// commit dummy data to store for testing
store.commit('update_server_status', appData.server_status)
store.commit('update_server_meters', appData.server_meters)
for (var i = 0; i < appData.server_tree.length; i++) {
  store.commit('add_server_tree_node', appData.server_tree[i])
}

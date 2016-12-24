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

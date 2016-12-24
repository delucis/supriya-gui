// import styling to normalize defaults across browsers
require('normalize.css');

// import and set-up Vue
import Vue from 'vue'

// import app components/structure from <App> Vue.js component
import App from './App.vue'


// bind Vue instance to div#app and render it as <App>
new Vue({
  el: '#app',
  render: h => h(App)
})

import globalStyles  from './style/global.scss'

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
  store.commit('POST_NODE', appData.server_tree[i])
}
for (var i = 0; i < appData.synthdefs.length; i++) {
  store.commit('POST_SYNTHDEF', appData.synthdefs[i])
}

// import utilities for generating fake data
import fakers from './utils/fakers.js'

// periodically update server_status in store with new fake data
setInterval(function(){
  let nuAvgCPU = fakers.wanderInRange(store.state.server_status.average_cpu_usage, {max: 100, maxStep: 0.2})
  let peakCPU = store.state.server_status.peak_cpu_usage
  let nuStatus = {
    average_cpu_usage: nuAvgCPU,
    peak_cpu_usage: nuAvgCPU > peakCPU ? nuAvgCPU : peakCPU
  }
  store.commit('update_server_status', nuStatus)
}, 100)
setInterval(function(){
  let nuStatus = {
    ugen_count: fakers.wanderInRange(store.state.server_status.ugen_count, {max: 10000, maxStep: 16, int: true}),
    synth_count: fakers.wanderInRange(store.state.server_status.synth_count, {max: 100, maxStep: 2, int: true}),
    group_count: fakers.wanderInRange(store.state.server_status.group_count, {max: 30, maxStep: 1, int: true})
  }
  store.commit('update_server_status', nuStatus)
}, 3256)

setInterval(function(){
  for (var meters in store.state.server_meters) {
    if (store.state.server_meters.hasOwnProperty(meters)) {
      let newLevels = store.state.server_meters[meters]
      for (var i = 0; i < 2; i++) {
        let level = fakers.fauxdio()
        newLevels[i] = { peak: level, rms: level/4 }
      }
      let newMeters = {
        [meters]: newLevels
      }
      store.commit('update_server_meters', newMeters)
    }
  }
}, 1000)

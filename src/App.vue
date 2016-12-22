<template>
  <div id="app">
    <app-bar></app-bar>
    <supriya-controls :instruments="instruments"></supriya-controls>
    <div style="display:flex">
      <vu-meters v-for="(values, key) in server_meters" :values="values" :name="key"></vu-meters>
    </div>
    <server-status :status="status"></server-status>
  </div>
</template>

<script>
import appBar from './components/app-bar.vue'
import supriyaControls from './components/supriya-controls.vue'
import vuMeters from './components/vu-meters.vue'
import serverStatus from './components/server-status.vue'
import appData from './supriya-dummy-1.json'
export default {
  name: 'app',
  components: {
    appBar,
    supriyaControls,
    vuMeters,
    serverStatus
  },
  props: 'controls',
  data () {
    return appData
  }
}
</script>

<template>
  <div id="app">
    <app-bar></app-bar>
    <supriya-controls :instruments="instruments"></supriya-controls>
    <div style="display:flex">
      <vu-meters v-for="(values, key) in server_meters" :values="values" :name="key"></vu-meters>
    </div>
    <server-status :status="server_status"></server-status>
  </div>
</template>

<script>
import appBar from './components/app-bar.vue'
import supriyaControls from './components/supriya-controls.vue'
import vuMeters from './components/vu-meters.vue'
import serverStatus from './components/server-status.vue'
export default {
  name: 'app',
  components: {
    appBar,
    supriyaControls,
    vuMeters,
    serverStatus
  },
  computed: {
    server_status () {
      return this.$store.state.server_status
    },
    server_meters () {
      return this.$store.state.server_meters
    }
  }
}
</script>

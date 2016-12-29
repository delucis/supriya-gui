<template>
  <div id="app">
    <app-bar></app-bar>
    <server-tree :server_tree="server_tree"></server-tree>
    <div style="display:flex">
      <vu-meters v-for="(levels, key) in server_meters" :levels="levels" :name="key" showPeaks showRMS showName></vu-meters>
    </div>
    <server-status :status="server_status"></server-status>
  </div>
</template>

<script>
import appBar from './components/app-bar.vue'
import serverTree from './components/server-tree.vue'
import vuMeters from './components/vu-meters.vue'
import serverStatus from './components/server-status.vue'
export default {
  name: 'app',
  components: {
    appBar,
    serverTree,
    vuMeters,
    serverStatus
  },
  computed: {
    server_status () {
      return this.$store.state.server_status
    },
    server_meters () {
      return this.$store.state.server_meters
    },
    server_tree () {
      return this.$store.state.server_tree
    }
  }
}
</script>

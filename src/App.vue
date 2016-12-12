<template>
  <div id="app">
    <app-bar></app-bar>
    <supriya-controls :instruments="instruments"></supriya-controls>
  </div>
</template>

<script>
import appBar from './components/app-bar.vue'
import supriyaControls from './components/supriya-controls.vue'
import appData from './supriya-dummy-1.json'
export default {
  name: 'app',
  components: {
    appBar,
    supriyaControls
  },
  props: 'controls',
  data () {
    return appData
  }
}
</script>

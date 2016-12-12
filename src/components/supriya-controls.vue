<template>
  <div class="sliders">
    <instrument v-for="instrument in instruments" :instrument="instrument">
    </instrument>
  </div>
</template>

<script>
import instrument from './instrument.vue'
export default {
  name: 'supriya-controls',
  props: ['instruments'],
  components: {
    instrument
  }
}
</script>

<style>
</style>

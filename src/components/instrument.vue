<template lang="html">
  <section class="instrument">
    <header v-show="instrument.name">
      Instrument: {{ instrument.name }}
    </header>
    <control v-for="control in instrument.controls" :control="control"></control>
  </section>
</template>

<script>
import control from './control.vue'
export default {
  name: 'instrument',
  props: [
    'instrument'
  ],
  components: {
    control
  }
}
</script>

<style lang="css">
.instrument {
  border: 1px solid grey;
}
</style>

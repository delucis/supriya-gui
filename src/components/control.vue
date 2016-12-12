<template lang="html">
  <slider v-if="control.type === 'slider'" :slider="control"></slider>
  <sup-button v-else-if="control.type === 'button'" :supButton="control"></button>
</template>

<script>
import slider from './slider.vue'
import supButton from './sup-button.vue'
export default {
  name: 'control',
  props: [
    'control'
  ],
  components: {
    slider,
    supButton
  }
}
</script>

<style lang="css">
</style>

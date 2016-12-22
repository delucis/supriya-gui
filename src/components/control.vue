<template lang="html">
  <slider v-if="control.type === 'slider'"
          :name="control.name"
          :value="control.value"
          :min="control.min"
          :max="control.max"
          :step="control.step"
          :unit="control.unit"
          :scale="control.scale"
          :showValue="control.showValue"
          :showLabel="control.showLabel">
  </slider>
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

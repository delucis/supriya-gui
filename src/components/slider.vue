<template>
  <div>
    <label v-if="slider.name && slider.showLabel"
            :for="_uid">{{ slider.name }}
    </label>
    <input :id="_uid"
            type="range"
            :min="slider.min"
            :max="slider.max"
            :value="slider.value"
            v-model.number="slider.value">
    <output v-if="slider.showValue"
            :for="_uid"
            class="slider-val">
      {{ slider.value }} {{ slider.unit }}
    </output>
  </div>
</template>

<script>
// N.B. validation & defaults are currently BROKEN :-/ :-S
  export default {
    name: 'slider',
    props: {
      "slider": {
        type: Object,
        default: function () {
          return {
            slider: {
              name: undefined,
              value: 0,
              min: 0,
              max: 127,
              step: 1,
              unit: undefined,
              scale: "lin",
              showLabel: true,
              showValue: true
            }
          }
        },
        validator: function (obj) {
          if (obj.hasOwnProperty('name') && typeof obj.name !== 'string') {
            return false
          } else if (obj.hasOwnProperty('value') && typeof obj.value !== 'number') {
            return false
          } else if (obj.hasOwnProperty('min') && typeof obj.min !== 'number') {
            return false
          } else if (obj.hasOwnProperty('max') && typeof obj.max !== 'number') {
            return false
          } else if (obj.hasOwnProperty('step') && typeof obj.step !== 'number') {
            return false
          } else if (obj.hasOwnProperty('unit') && typeof obj.unit !== 'string') {
            return false
          } else if (obj.hasOwnProperty('scale') && typeof obj.scale !== 'string') {
            return false
          } else if (obj.hasOwnProperty('showLabel') && typeof obj.showLabel !== 'boolean') {
            return false
          } else if (obj.hasOwnProperty('showValue') && typeof obj.showValue !== 'boolean') {
            return false
          } else {
            return true
          }
        }
      }
    }
  }
</script>

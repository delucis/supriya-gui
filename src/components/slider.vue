<template>
  <div>
    <label v-if="name && showLabel"
            :for="_uid">{{ name }}
    </label>
    <input :id="_uid"
            type="range"
            :min="min"
            :max="max"
            :step="step"
            :value="value"
            v-model.number="value">
    <output v-if="showValue"
            :for="_uid"
            class="slider-val">
      {{ value }} {{ unit }}
    </output>
  </div>
</template>

<script>
// N.B. validation & defaults are currently BROKEN :-/ :-S
  export default {
    name: 'slider',
    props: {
      name: {
        type: String
      },
      value: {
        type: Number,
        default: 0
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 127
      },
      step: {
        type: Number,
        default: 1
      },
      unit: {
        type: String
      },
      scale: {
        type: String
      },
      showLabel: {
        type: Boolean,
        default: false
      },
      showValue: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

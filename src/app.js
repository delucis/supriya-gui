const Vue = require('vue');

Vue.component('slider', {
  props: {
    "slider": {
      type: Object,
      "value": {
        type: Number,
        default: 0,
      },
      "min": {
        type: Number,
        default: 0
      },
      "max": {
        type: Number,
        default: 127
      },
      "step": {
        type: Number,
        default: 1
      },
      "unit": {
        type: String,
        default: ""
      },
      "scale": {
        type: String,
        default: "lin"
      }
    }
  },
  template: '<div><input type="range" :min="slider.min" :max="slider.max" :value="slider.value" v-model.number="slider.value" id="fader"><output for="fader" id="fader-val">{{ slider.value }}</output></div>'
})

Vue.component('supriya-controls', {
  props: ['controls'],
  template: '<div class="sliders"><slider v-for="slider in controls.sliders" :slider="slider"></slider></div>'
})

var gui = new Vue({
  el: '#app',
  data: {
    controls: {
      sliders: [
        { value: 34, max: 50 },
        { value: 100 },
        { value: 0, min: -70 }
      ]
    }
  }
})

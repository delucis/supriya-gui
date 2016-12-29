<template lang="html">
  <canvas class="vu-meter"
          :width="width"
          :height="height"
          v-draw-meter="{ amp: dBAmp, rms: dBRMS, peak: dBPeakVal, clipSize: clipSize, showPeaks: showPeaks, showRMS: showRMS }">
  </canvas>
</template>

<script>
export default {
  name: 'vu-meter',
  data () {
    return { peakVal: 0 }
  },
  props: {
    amp: {
      type: Number,
      default: 0
    },
    rms: {
      type: Number,
      default: 0
    },
    refreshRate: {
      type: Number,
      default: 100
    },
    clipSize: {
      type: Number,
      default: 10
    },
    width: {
      type: Number,
      default: 10
    },
    height: {
      type: Number,
      default: 150
    },
    showPeaks: {
      type: Boolean,
      default: false
    },
    showRMS: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dBAmp () {
      return 20 * Math.log10(this.amp)
    },
    dBRMS () {
      return 20 * Math.log10(this.rms)
    },
    dBPeakVal () {
      return 20 * Math.log10(this.peakVal)
    }
  },
  watch: {
    amp (newVal, oldVal) {
      if (this.showPeaks) {
        let smoothingFactor = 50
        if (newVal > this.peakVal) {
          this.peakVal = newVal
        } else {
          this.peakVal = newVal * (1 / smoothingFactor) + this.peakVal * ((smoothingFactor - 1) / smoothingFactor)
        }
      }
    }
  },
  directives: {
    drawMeter (canvas, binding) {
      let clipSize = binding.value.clipSize
      let showPeaks = binding.value.showPeaks
      let showRMS = binding.value.showRMS
      let amp = binding.value.amp / 76 + 1
      let rms = binding.value.rms / 76 + 1
      let peak = binding.value.peak / 76 + 1
      let w = canvas.width
      let h = canvas.height
      let hInRange = h - clipSize
      let ctx = canvas.getContext("2d")
      let gradient = ctx.createLinearGradient(0, 0, 0, h)
      gradient.addColorStop(0, "red")
      gradient.addColorStop(clipSize / h, "orange")
      gradient.addColorStop(clipSize / h, "greenyellow")
      gradient.addColorStop(1, "lime")
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = gradient
      ctx.fillRect(0, h - hInRange * amp, w, hInRange * amp)
      if (showRMS) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)"
        ctx.fillRect(0, h - hInRange * rms, w, hInRange * rms)
      }
      if (showPeaks) {
        if (peak >= 1) {
          ctx.fillStyle = "red"
        } else {
          ctx.fillStyle = "greenyellow"
        }
        ctx.fillRect(0, Math.round(h - hInRange * peak), w, 1)
      }
      ctx.fillStyle = "white"
      ctx.fillRect(0, clipSize, w, 1)
    }
  }
}
</script>

<style lang="sass">
.vu-meter {
  background: #000;
}
</style>

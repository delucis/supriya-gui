<template lang="html">
  <div class="vu-meters">
    <div>
      <vu-meter v-for="value in values"
                :value="value"
                :clipSize="clipSize"
                :width="width"
                :height="height">
      </vu-meter>
    </div>
    <p v-if="name" v-text="prettyName"></p>
  </div>
</template>

<script>
import vuMeter from './vu-meter.vue'
export default {
  name: 'vu-meters',
  props: {
    values: {
      type: Array,
      default: function () {
          return [
            {peak: 0, rms:0},
            {peak: 0, rms:0}
          ]
      }
    },
    name: {
      type: String
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
    }
  },
  computed: {
    prettyName: function () {
      return this.name.replace(/_/g, ' ');
    }
  },
  components: {
    vuMeter
  }
}
</script>

<style lang="sass">
.vu-meters {
  .vu-meter {
    margin: 0 1px;
  }
}
</style>

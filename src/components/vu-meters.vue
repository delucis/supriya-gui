<template lang="html">
  <figure class="vu-meters">
    <div>
      <vu-meter v-for="level in levels"
                :amp="level.peak"
                :rms="level.rms"
                :clipSize="clipSize"
                :width="width"
                :height="height"
                :showPeaks="showPeaks"
                :showRMS="showRMS">
      </vu-meter>
    </div>
    <figcaption v-if="showName && name" v-text="prettyName"></figcaption>
  </figure>
</template>

<script>
import vuMeter from './vu-meter.vue'
export default {
  name: 'vu-meters',
  props: {
    levels: {
      type: Array,
      default () {
          return [
            {peak: 0, rms:0},
            {peak: 0, rms:0}
          ]
      }
    },
    name: {
      type: String
    },
    showName: {
      type: Boolean,
      default: false
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
    prettyName () {
      return this.name.replace(/_/g, ' ')
    }
  },
  components: {
    vuMeter
  }
}
</script>

<style lang="sass">
@import "~styles/vars";
.vu-meters {
  margin: $spacing;
  padding: $spacing;
  background: $oc-gray-1;
  @include module-shadow;
  text-align: center;
  .vu-meter {
    margin: 0 1px;
  }
  figcaption {
    @include text-caption;
  }
}
</style>

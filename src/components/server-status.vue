<template lang="html">
  <footer id="server-status">
    Server Status:
    <span title="Average CPU Usage">
      {{ average_cpu_usage }}%
    </span>
    <span title="Peak CPU Usage">
      {{ peak_cpu_usage }}%
    </span>
    <span title="Number of Unit Generators">
      {{ status.ugen_count }}u
    </span>
    <span title="Number of Synths">
      {{ status.synth_count }}s
    </span>
    <span title="Number of Groups">
      {{ status.group_count }}g
    </span>
    <span title="Number of Synthdefs">
      {{ status.synthdef_count }}d
    </span>
  </footer>
</template>

<script>
export default {
  name: 'server-status',
  props: {
    status: {
      type: Object,
      default () {
        return {
          actual_sample_rate: 44100.,
          average_cpu_usage: 0,
          group_count: 0,
          peak_cpu_usage: 0,
          synth_count: 0,
          synthdef_count: 0,
          target_sample_rate: 44100.,
          ugen_count: 0
        }
      }
    }
  },
  computed: {
    average_cpu_usage () {
      let avg = Math.round((this.status.average_cpu_usage + 0.00001) * 10) / 10
      return avg.toFixed(1)
    },
    peak_cpu_usage () {
      let peak = Math.round((this.status.peak_cpu_usage + 0.00001) * 10) / 10
      return peak.toFixed(1)
    }
  }
}
</script>

<style lang="sass">
@import "~styles/vars";

$bar-height: 2em;

#app {
  padding-bottom: $bar-height;
}

#server-status {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  font-feature-settings: "tnum" 1;
  line-height: $bar-height;
  text-align: right;
  background: transparentize($oc-gray-9, 0);
  color: $oc-green-3;
  span {
    padding: 0 $spacing;
  }
}
</style>

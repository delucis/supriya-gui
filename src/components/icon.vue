<template lang="html">
  <span class="material-icons"
        :class="[colorClass, sizeClass, { 'material-icons--inactive': inactive }]">
    {{ icon }}
  </span>
</template>

<script>
export default {
  name: 'icon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'dark'
    },
    size: {
      type: String,
      default: 'small'
    },
    inactive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeClass () {
      switch (this.size) {
        case 'tiny':
          return 'material-icons--tiny'
        case 'medium':
          return 'material-icons--medium'
        case 'large':
          return 'material-icons--large'
        case 'huge':
          return 'material-icons--huge'
        case 'small':
        default:
          return 'material-icons--small'
      }
    },
    colorClass () {
      switch (this.color) {
        case 'light':
          return 'material-icons--light'
        case 'dark':
        default:
          return 'material-icons--dark'
      }
    }
  }
}
</script>

<style lang="sass">
@import "~styles/vars";
.material-icons {
  line-height: inherit;
}
  .material-icons--dark {
    color: $text-primary;
  }
  .material-icons--light {
    color: $text-light;
  }
  .material-icons--inactive {
    opacity: 0.3;
  }
  .material-icons--tiny {
    font-size: $icon-size-tiny;
  }
  .material-icons--small {
    font-size: $icon-size-small;
  }
  .material-icons--medium {
    font-size: $icon-size-medium;
  }
  .material-icons--large {
    font-size: $icon-size-large;
  }
  .material-icons--huge {
    font-size: $icon-size-huge;
  }
</style>

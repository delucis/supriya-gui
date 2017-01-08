<template>
  <header class="app-bar">
    <h1 class="app-bar__title">
      Supriya GUI
    </h1>
    <div class="app-bar__controls">
      <button @click="showAll" :disabled="isAllNodesShown">
        <icon icon="visibility" :inactive="isAllNodesShown"></icon>
        Expand All Nodes
      </button>
      <button @click="hideAll" :disabled="isNoNodesShown">
        <icon icon="visibility_off" :inactive="isNoNodesShown"></icon>
        Collapse All Nodes
      </button>
    </div>
  </header>
</template>

<script>
import icon from './icon.vue'
export default {
  name: 'app-bar',
  components: {
    icon
  },
  computed: {
    isAllNodesShown () {
      return this.$store.getters.isAllNodesShown
    },
    isNoNodesShown () {
      return this.$store.getters.isNoNodesShown
    }
  },
  methods: {
    showAll () {
      this.$store.dispatch('show_nodes', {
        show: true
      })
    },
    hideAll () {
      this.$store.dispatch('show_nodes', {
        show: false
      })
    }
  }
}
</script>

<style lang="sass">
@import "~styles/vars";
.app-bar {
  padding: $spacing;
  margin-bottom: $spacing;
  background: $oc-gray-1;
  display: flex;
  justify-content: space-between;
  .app-bar__title {
    @include text-subheading;
    margin: 0;
  }
  @include module-shadow;
}
</style>

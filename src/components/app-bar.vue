<template>
  <header id="app-header">
    <h1 class="app-header__title">
      Supriya GUI
    </h1>
    <div class="app-header__controls">
      <button @click="showAll" :disabled="isAllNodesShown">
        Expand All Nodes
      </button>
      <button @click="hideAll" :disabled="isNoNodesShown">
        Collapse All Nodes
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'app-bar',
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
#app-header {
  padding: $spacing;
  margin-bottom: $spacing;
  background: $oc-gray-1;
  display: flex;
  justify-content: space-between;
  .app-header__title {
    @include text-subheading;
    margin: 0;
  }
  @include module-shadow;
}
</style>

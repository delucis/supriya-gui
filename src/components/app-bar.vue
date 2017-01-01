<template>
  <header id="app-header">
    Supriya GUI
  </header>
</template>

<script>
export default {
  name: 'app-bar'
}
</script>

<style lang="sass">
@import "~styles/vars";
#app-header {
  padding: 0 $spacing;
  background: $oc-gray-2;
  line-height: 2;
}
</style>

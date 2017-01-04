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
  padding: $spacing;
  margin-bottom: $spacing;
  background: $oc-gray-1;
  @include text-subheading;
  @include module-shadow;
}
</style>

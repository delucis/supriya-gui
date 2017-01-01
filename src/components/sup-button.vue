<template lang="html">
  <button type="button" name="button">{{ supButton.name }}</button>
</template>

<script>
export default {
  name: 'sup-button',
  props: [
    'supButton'
  ]
}
</script>

<style lang="sass">
</style>

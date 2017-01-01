<template lang="html">
  <div class="server-tree">
    <server-node v-for="node in server_tree.tree.child_nodes" :node="node"></server-node>
  </div>
</template>

<script>
import serverNode from './server-node.vue'
export default {
  name: 'server-tree',
  props: {
    server_tree: {
      type: Object
    }
  },
  components: {
    serverNode
  }
}
</script>

<style lang="sass">
.server-tree {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>

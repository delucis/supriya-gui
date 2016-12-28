<template lang="html">
  <section class="server-node">
    <header class="id">
      {{node.node_id}}
    </header>
    <ul v-if="hasControls" class="controls">
      <li v-for="(value, key) in node.controls" v-text="key + ': ' + value"></li>
    </ul>
    <div v-if="hasChildren" class="children">
      <server-node v-for="child_node in node.child_nodes" :node="child_node"></server-node>
    </div>
  </section>
</template>

<script>
export default {
  name: 'server-node',
  props: {
    node: {
      type: Object
    }
  },
  computed: {
    hasChildren () {
      return this.node.hasOwnProperty('child_nodes')
    },
    hasControls () {
      return this.node.hasOwnProperty('controls')
    }
  }
}
</script>

<style lang="sass">
.server-node {
  margin: 0.5em;
  flex-grow: 1;
  // border: 1px solid rgba(0,0,0,0.5);
  background-color: rgba(0,0,0,0.07);
  .id {
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(0,0,0,0.4);
    color: white;
    // border-bottom: 1px solid rgba(0,0,0,0.5);
    font-size: 0.65em;
    font-weight: 900;
    padding: 0.25em;
  }
  .children {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

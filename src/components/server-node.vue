<template lang="html">
  <section class="server-node">
    <header class="node-bar">
      <h1 class="id">{{node.node_id}}</h1>
      <button v-on:click="showBody = !showBody" class="toggle">
        {{ toggleIcon }}
      </button>
    </header>
    <div v-show="showBody" class="node-body">
      <ul v-if="hasControls" class="controls">
        <li v-for="(value, key) in node.controls" v-text="key + ': ' + value"></li>
      </ul>
      <div v-if="hasChildren" class="children">
        <server-node v-for="child_node in node.child_nodes" :node="child_node"></server-node>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'server-node',
  props: {
    showBody: {
      type: Boolean,
      default: true
    },
    node: {
      type: Object
    }
  },
  computed: {
    toggleIcon () {
      return this.showBody ? '–' : '+'
    },
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
  background-color: rgba(0,0,0,0.05);
  .node-bar {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(0,0,0,0.1);
    // border-bottom: 1px solid rgba(0,0,0,0.5);
    font-size: 0.65em;
    font-weight: 900;
    .id {
      font-size: 1em;
      line-height: 1.5;
      padding: 0 0.25em;
      margin: 0;
    }
    .toggle {
      color: white;
      background-color: rgba(0,0,0,0.3);
      border: none;
      font-size: 1em;
      line-height: 1.5;
      padding: 0 0.5em;
      margin: 0 0 0 0.5em;
      font-weight: 900;
      cursor: pointer;
      &:hover {
        background-color: rgba(255,0,0,0.5);
      }
    }
  }
  .children {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
}
</style>

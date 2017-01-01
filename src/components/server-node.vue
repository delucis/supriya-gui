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
@import "~styles/vars";
.server-node {
  margin: $spacing;
  flex-grow: 1;
  background-color: $oc-gray-0;
  box-shadow: 0 0 1em -0.5em $oc-gray-8;
  .node-bar {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    background-color: $oc-gray-2;
    font-size: 0.65em;
    font-weight: 900;
    .id {
      font-size: 1em;
      line-height: 1.5;
      padding: 0 0.25em;
      margin: 0;
    }
    .toggle {
      color: $text-primary;
      background-color: transparent;
      border: none;
      font-size: 1em;
      line-height: 1.5;
      padding: 0 0.5em;
      margin: 0 0 0 0.5em;
      font-weight: 900;
      cursor: pointer;
      &:hover {
        color: $oc-gray-0;
        background-color: $oc-red-5;
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

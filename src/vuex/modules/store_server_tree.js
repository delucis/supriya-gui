import Vue from 'vue'
import getBreadcrumbs from './../helpers/getBreadcrumbs.js'
import getTarget from './../helpers/getTarget.js'

// define a Vuex store module to handle server tree state
export default {
  state: {
    nodes: {},
    orphans: {},
    tree: {
      child_nodes: {}
    }
  },
  mutations: {
    /**
     * Adds a new node to the server tree. Errors if `node_id` already exists.
     *
     * @param {object} state - current state in store
     * @param {object} payload - a new server tree node (must contain `node_id`)
     *
     * @see update_server_tree_node
     */
    add_server_tree_node (state, payload) {
      // alias payload for more reasonable code
      let node = payload
      // make sure all conditions are met to add node to tree
      // Make sure node has a node_id property
      if (!node.hasOwnProperty('node_id')) {
        console.error('add_server_tree_node(): payload object must have node_id property.')
        return
      }
      // Make sure node has a parent property (even if it’s null)
      if (!node.hasOwnProperty('parent')) {
        console.error('add_server_tree_node(): payload object must have parent property.')
        return
      }
      // Make sure node’s node_id is new, i.e. not already present in nodes or orphans
      if (state.nodes.hasOwnProperty(node.node_id)
          || state.orphans.hasOwnProperty(node.node_id))
      {
        console.error('add_server_tree_node(): server_tree already contains a node with id of “' + node.node_id + '”. Use update_server_tree_node() instead.')
        return
      }
      // Make sure node’s parent is in the nodes list, otherwise it is an orphan
      // unless it’s parent is null, in which case it is a root node
      if (node.parent !== null
          && !state.nodes.hasOwnProperty(node.parent))
      {
        Vue.set(state.orphans, node.node_id, node)
        return
      }

      // Build up a “breadcrumbs” array for tracing a node’s position in the tree
      let breadcrumbs = getBreadcrumbs(node, state.nodes)
      // attach “breadcrumbs” array to the node for later reference
      Vue.set(node, 'breadcrumbs', breadcrumbs)

      // Trace breadcrumbs up tree to find place to attach new node
      let target = getTarget(state.tree, breadcrumbs)

      if (!target.child_nodes) {
        Vue.set(target, 'child_nodes', {})
      }
      // attach to tree and add node to nodes
      Vue.set(target.child_nodes, node.node_id, node)
      Vue.set(state.nodes, node.node_id, node)

      // run through orphans to pick up any that have this node as parent
      for (var orphan in state.orphans) {
        if (state.orphans.hasOwnProperty(orphan)) {
          if (state.orphans[orphan].hasOwnProperty('parent')
              && state.orphans[orphan].parent === node.node_id)
          {
            // if orphan has the new node as a parent,
            // add it to the tree and move it from orphans to nodes
            let orphanNode = state.orphans[orphan]
            let orphanBreadcrumbs = getBreadcrumbs(orphanNode, state.nodes)
            Vue.set(orphanNode, 'breadcrumbs', orphanBreadcrumbs)
            let orphanTarget = target.child_nodes[node.node_id]
            if (!orphanTarget.child_nodes) {
              Vue.set(orphanTarget, 'child_nodes', {})
            }
            // attach to tree, add to nodes, remove from orphans
            Vue.set(orphanTarget.child_nodes, orphanNode.node_id, orphanNode)
            Vue.set(state.nodes, orphanNode.node_id, orphanNode)
            Vue.delete(state.orphans, orphanNode.node_id)
          }
        }
      }
    },
    /**
     * Updates an existing node in the server tree. Errors if `node_id` doesn’t exist.
     * Updated properties must match in type. Adding properties to nodes is permitted.
     *
     * @param {object} state - current state in store
     * @param {object} payload - server tree node to update (must contain `node_id`)
     *
     * @see add_server_tree_node
     */
    update_server_tree_node (state, payload) {
      if (payload.hasOwnProperty('node_id')) {
        if (state.nodes.hasOwnProperty(payload.node_id)) {
          for (var property in payload) {
            if (payload.hasOwnProperty(property)) {
              if (state.nodes[payload.node_id].hasOwnProperty(property)
                  && typeof state.nodes[payload.node_id][property] !== typeof payload[property])
              {
                console.error('update_server_tree_node(): “' + state.nodes[payload.node_id][property] + '” and “' + payload[property] + '” are of different types.')
              } else {
                Vue.set(state.nodes[payload.node_id], property, payload[property])
              }
            }
          }
        } else {
          console.error('update_server_tree_node(): server_tree does not contain a node with id of “' + payload.node_id + '”. Use add_server_tree_node() instead.')
        }
      } else {
        console.error('update_server_tree_node(): payload object must have node_id property.')
      }
    }
  }
}

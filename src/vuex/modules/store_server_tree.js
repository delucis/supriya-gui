/**
   # NOTES ON BUILDING A TREE

       Nodes each have:
       - a node_id
       - a parent
       - children (perhaps)

       Nodes are stored in:
       - nodes OR
       - orphans

       The full tree is stored in:
       - tree

   ## Adding a node to the tree:

   Can this node be added?
   1. Test it has a node_id & a parent property (even if null)
   2. Test a node with that id does not already exist in nodes or orphans

   Great! Should we include orphaned children while we’re at it?
   3. Are there any node.children?
   4. If so, are they waiting in orphans?
   5. If so, embed them explicitly in node & remove from orphans.

   OK. Where should we add the node?
   6. Is node.parent in nodes?
      YES:
         If so, add to array to build breadcrumbs
         Loop a-b) recursively using until we reach a null parent, e.g.
                        nodes[node.parent].parent
                  nodes[nodes[node.parent].parent].parent
                                  etc.
        Use breadcrumbs to add node to tree.
      NO:
        Add node to orphans

*/

import Vue from 'vue'

// define a Vuex store module to handle server tree state
export default {
  state: {
    nodes: {},
    orphans: {},
    tree: {}
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
      if (payload.hasOwnProperty('node_id')) {
        // build an “address” array for the node
        // an address gives you the path to that node from the root,
        // e.g. [0, 1, 1002] implies this has an address of nodes.0.1.1002.this
        if(!state.nodes.hasOwnProperty(payload.node_id)) {
          let address
          if (payload.parent !== null) {
            address = []
            let id = payload.parent
            address.unshift(id)
            while (state.nodes[id].hasOwnProperty('parent') && state.nodes[id].parent !== null) {
              address.unshift(state.nodes[id].parent)
              id = state.nodes[id].parent
            }
          } else {
            address = null
          }
          payload.address = address
          Vue.set(state.nodes, payload.node_id, payload)
        } else {
          console.error('add_server_tree_node(): server_tree already contains a node with id of “' + payload.node_id + '”. Use update_server_tree_node() instead.')
        }
      } else {
        console.error('add_server_tree_node(): payload object must have node_id property.')
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
                  && typeof state.nodes[payload.node_id][property] !== typeof payload[propety])
              {
                console.error('update_server_tree_node(): “' + state.nodes[payload.node_id][property] + '” and “' + payload[property] + '” are of different types.')
              } else {
                state.nodes[payload.node_id][property] = payload[propety]
              }
            }
          }
        } else {
          console.error('update_server_tree_node(): server_tree does not contain a node with id of “' + payload.node_id + '”. Use add_server_tree_node() instead.')
        }
      } else {
        console.error('add_server_tree_node(): payload object must have node_id property.')
      }
    }
  },
  getters: {
    /**
     * Returns an alternative server tree representation nesting nodes within their parents.
     *
     * @constructor
     * @param {object} state - current state in store
     */
    nested_server_tree (state) {
      let nestedServerTree = {}
      return nestedServerTree
    },
    build_nested_server_tree (state) {

    }
  }
}

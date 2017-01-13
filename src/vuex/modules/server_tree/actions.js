/** Actions for store_server_tree Vuex module. */
let server_tree_actions = {}

    /**
     * Commits a POST_NODE() mutation with the node provided in the payload.
     * Also, commits a SHOW_NODE() mutation ensuring node.showBody will be set.
     *
     * @param {object} context
     * @param {function} context.commit - the commit method from the Vuex context
     * @param {object} payload
     * @param {number} payload.node_id - a unique ID for the new node
     * @param {number} payload.parent - the ID of the new node’s parent node (null if at root)
     *
     * @see patch_node
     * @see POST_NODE
     * @see SHOW_NODE
     */
    server_tree_actions.post_node = function ({commit}, payload) {
      commit('POST_NODE', payload)
      commit('SHOW_NODE', {
        node_id: payload.node_id,
        show: payload.hasOwnProperty('showBody') ? payload.showBody : true
      })
    }

    /**
     * Commits a PATCH_NODE() mutation.
     *
     * @param {object} context
     * @param {function} context.commit - the commit method from the Vuex context
     * @param {object} payload - server tree node to update
     * @param {number} payload.node_id - ID of node to update
     *
     * @see post_node
     */
    server_tree_actions.patch_node = function ({commit}, payload) {
      commit('PATCH_NODE', payload)
    }

    /**
     * Commits a PATCH_NODE_CONTROLS() mutation.
     *
     * @param {object} context
     * @param {function} context.commit - the commit method from the Vuex context
     * @param {object} payload - object representing updates to apply
     * @param {object} payload.node_id - ID of node to update
     * @param {object} payload.controls - object containing key-value pairs of controls to update
     *
     * @see PATCH_NODE_CONTROLS
     */
    server_tree_actions.patch_node_controls = function ({commit}, payload) {
      commit('PATCH_NODE_CONTROLS', payload)
    }

    /**
     * Commits a SHOW_NODE() mutation.
     *
     * @param {object} context
     * @param {function} context.commit - the commit method from the Vuex context
     * @param {object} payload - object representing changes to apply
     * @param {number} payload.node_id - ID of node to show/hide
     * @param {boolean} [payload.show=true] - whether or not the node should be shown or not
     *
     * @see SHOW_NODE
     */
    server_tree_actions.show_node = function ({commit}, payload) {
      commit('SHOW_NODE', payload)
    }

    /**
     * Commit SHOW_NODE() mutations to set all or no nodes to be shown.
     *
     * @param {object} context
     * @param {function} context.commit - the commit method from the Vuex context
     * @param {object} context.getters - the getters defined in this module
     * @param {object} payload
     * @param {boolean} [payload.show=true] - whether nodes should be shown (true) or not (false)
     *
     * @see SHOW_NODE
     */
    server_tree_actions.show_nodes = function ({commit, getters}, payload) {
      let show = payload.hasOwnProperty('show') ? payload.show : true
      let nodes = show ? getters.unshownNodes : getters.shownNodes
      for (var node in nodes) {
        if (nodes.hasOwnProperty(node)) {
          commit('SHOW_NODE', {
            node_id: node,
            show: show
          })
        }
      }
    }

    /**
     * Commit an ORPHAN_NODE() mutation to orphan the specified node, and also
     * commit ORPHAN_NODE() mutations to orphan all of that node’s children.
     *
     * @param {object} context
     * @param {function} context.dispatch - the dispatch method from the Vuex context
     * @param {function} context.commit - the commit method from the Vuex context
     * @param {object} context.state - the current state in the store
     * @param {object} payload
     * @param {number} payload.node_id - ID of node to orphan
     *
     * @see orphan_children
     * @see ORPHAN_NODE
     */
    server_tree_actions.orphan_node = function ({dispatch, commit, state}, payload) {
      if (payload.hasOwnProperty('node_id')) {
        dispatch('orphan_children', {
          node_id: payload.node_id
        })
      }
      commit('ORPHAN_NODE', payload)
    }

    /**
     * Commit ORPHAN_NODE() mutations to orphan all of a given node’s children.
     *
     * @param {object} context
     * @param {function} context.dispatch - the dispatch method from the Vuex context
     * @param {function} context.commit - the commit method from the Vuex context
     * @param {object} context.state - the current state in the store
     * @param {object} payload
     * @param {number} payload.node_id - ID of node whose children should be orphaned
     *
     * @see orphan_node
     * @see ORPHAN_NODE
     */
    server_tree_actions.orphan_children = function ({dispatch, commit, state}, payload) {
      if (payload.hasOwnProperty('node_id')
          && state.nodes.hasOwnProperty(payload.node_id)
          && state.nodes[payload.node_id].hasOwnProperty('child_nodes'))
      {
        let childNodes = state.nodes[payload.node_id].child_nodes
        for (var childNode in childNodes) {
          if (childNodes.hasOwnProperty(childNode)) {
            dispatch('orphan_node', {
              node_id: childNodes[childNode].node_id
            })
          }
        }
      }
    }

    /**
     * Commit a DELETE_NODE() mutation to delete the specified node, and also
     * commit DELETE_NODE() mutations to delete all of that node’s children.
     *
     * @param {object} context
     * @param {function} context.dispatch - the dispatch method from the Vuex context
     * @param {function} context.commit - the commit method from the Vuex context
     * @param {object} context.state - the current state in the store
     * @param {object} payload
     * @param {number} payload.node_id - ID of node to delete
     *
     * @see delete_children
     * @see DELETE_NODE
     */
    server_tree_actions.delete_node = function ({dispatch, commit, state}, payload) {
      if (payload.hasOwnProperty('node_id')) {
        dispatch('delete_children', {
          node_id: payload.node_id
        })
      }
      commit('DELETE_NODE', payload)
    }

    /**
     * Commit DELETE_NODE() mutations to delete all of a given node’s children.
     *
     * @param {object} context
     * @param {function} context.dispatch - the dispatch method from the Vuex context
     * @param {function} context.commit - the commit method from the Vuex context
     * @param {object} context.state - the current state in the store
     * @param {object} payload
     * @param {number} payload.node_id - ID of node whose children should be deleted
     *
     * @see delete_node
     * @see DELETE_NODE
     */
    server_tree_actions.delete_children = function ({dispatch, commit, state}, payload) {
      if (payload.hasOwnProperty('node_id')
          && state.nodes.hasOwnProperty(payload.node_id)
          && state.nodes[payload.node_id].hasOwnProperty('child_nodes'))
      {
        let childNodes = state.nodes[payload.node_id].child_nodes
        for (var childNode in childNodes) {
          if (childNodes.hasOwnProperty(childNode)) {
            dispatch('delete_node', {
              node_id: childNodes[childNode].node_id
            })
          }
        }
      }
    }

export default server_tree_actions

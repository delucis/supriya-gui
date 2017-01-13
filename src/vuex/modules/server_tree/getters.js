/** Getters for store_server_tree Vuex module. */
let server_tree_getters = {}

    /**
     * Gets all the nodes whose showBody property is currently true.
     *
     * @param {Object} $0 - current state in store
     * @param {Object} $0.nodes - nodes object in state
     * @returns {Object} An object containing nodes whose bodyShow property is true.
     */
    server_tree_getters.shownNodes = ({nodes}) => {
      let shownNodes = {}
      for (var node in nodes) {
        if (nodes.hasOwnProperty(node)) {
          if (nodes[node].showBody) {
            shownNodes[node] = nodes[node]
          }
        }
      }
      return shownNodes
    }

    /**
     * Gets all the nodes whose showBody property is currently false.
     *
     * @param {Object} $0 - current state in store
     * @param  {Object} $0.nodes - nodes object in state
     * @returns {Object} An object containing nodes whose bodyShow property is false.
     */
    server_tree_getters.unshownNodes = ({nodes}) => {
      let unshownNodes = {}
      for (var node in nodes) {
        if (nodes.hasOwnProperty(node)) {
          if (!nodes[node].showBody) {
            unshownNodes[node] = nodes[node]
          }
        }
      }
      return unshownNodes
    }

    /**
     * Gets the number of nodes currently in the server tree.
     *
     * @param {Object} $0 - current state in store
     * @param  {Object} $0.nodes - nodes object in state
     * @return {Number} Number of nodes in state.nodes.
     */
    server_tree_getters.nodesCount = ({nodes}) => {
      return Object.keys(nodes).length
    }

    /**
     * Gets the number of nodes with showBody set to true.
     *
     * @param {Object} state - current state in store
     * @param {Object} $1.shownNodes - the value of the showNodes getter
     * @returns {Number} Number of nodes with showBody set to true.
     */
    server_tree_getters.shownNodesCount = (state, {shownNodes}) => {
      return Object.keys(shownNodes).length
    }

    /**
     * Gets the number of nodes with showBody set to false.
     *
     * @param  {Object} state - current state in store
     * @param {Object} $1 - the module’s getters object
     * @param  {Object} $1.unshownNodes - the value of the unshownNodes getter
     * @return {Number} Number of nodes with showBody set to false.
     */
    server_tree_getters.unshownNodesCount = (state, {unshownNodes}) => {
      return Object.keys(unshownNodes).length
    }

    /**
     * Gets whether or not all nodes are currently shown.
     *
     * @param  {Oject} state - current state in store
     * @param {Object} $1 - the module’s getters object
     * @param  {Number} $1.shownNodesCount - the value of the shownNodesCount getter
     * @param  {Number} $1.nodesCount - the value of the nodesCount getter
     * @return {Boolean} True if the number of shown nodes equals the total number of nodes.
     */
    server_tree_getters.isAllNodesShown = (state, {shownNodesCount, nodesCount}) => {
      return shownNodesCount === nodesCount
    }

    /**
     * Gets whether or not all nodes are currently unshown.
     *
     * @param  {Oject} state - current state in store
     * @param {Object} $1 - the module’s getters object
     * @param  {Number} $1.unshownNodesCount - the value of the unshownNodesCount getter
     * @param  {Number} $1.nodesCount - the value of the nodesCount getter
     * @return {Boolean} True if the number of unshown nodes equals the total number of nodes.
     */
    server_tree_getters.isNoNodesShown = (state, {unshownNodesCount, nodesCount}) => {
      return unshownNodesCount === nodesCount
    }

export default server_tree_getters

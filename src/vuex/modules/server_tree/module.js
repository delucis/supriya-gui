/**
 * Vuex store module for managing the state of a tree of server nodes.
 * @module server_tree
 */

import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}

/** Actions for synthdefs Vuex module. */
let synthdefs_actions = {}

    /**
     * Commits a POST_SYNTHDEF mutation.
     *
     * @param {object} $0
     * @param {function} $0.commit - the commit method from the Vuex context
     * @param {object} payload - a synth definition object to add to the store
     * @param {string} payload.hash - a unique hash that will be used to identify the new synthdef
     *
     * @example
     * let synthdef = {
     *   hash: 'da0982184cc8fa54cf9d288a0fe1f6ca',
     *   name: 'default',
     *   parameters: { }
     * }
     *
     * // Using Vuex’s .dispatch method automatically exposes a context object
     * // as the dispatched action’s first argument.
     *
     * // Assuming “store” is our Vuex store, we can dispatch this action
     * // with the “synthdef” object as its payload:
     * store.dispatch('post_synthdef', synthdef)
     */
    synthdefs_actions.post_synthdef = function ({commit}, payload) {
      commit('POST_SYNTHDEF', payload)
    }

    /**
     * Commits a PUT_SYNTHDEF mutation.
     *
     * @param {object} $0
     * @param {function} $0.commit - the commit method from the Vuex context
     * @param {object} payload - a synth definition object to replace in the store
     * @param {string} payload.hash - an identifying hash that will be used to match the synthdef to be replaced
     *
     * @example
     * let synthdef = {
     *   hash: 'da0982184cc8fa54cf9d288a0fe1f6ca',
     *   name: 'default',
     *   parameters: {
     *     // e.g. some different/updated parameters
     *   }
     * }
     *
     * // Using Vuex’s .dispatch method automatically exposes a context object
     * // as the dispatched action’s first argument.
     *
     * // Assuming “store” is our Vuex store, we can dispatch this action
     * // with the “synthdef” object as its payload:
     * store.dispatch('put_synthdef', synthdef)
     */
    synthdefs_actions.put_synthdef = function ({commit}, payload) {
      commit('PUT_SYNTHDEF', payload)
    }

    /**
     * Commits a DELETE_SYNTHDEF mutation.
     *
     * @param {object} $0
     * @param {function} $0.commit - the commit method from the Vuex context
     * @param {object} payload
     * @param {object} payload.hash - an identifying hash that will be used to select the synthdef to be deleted
     *
     * @example
     * let data = {
     *   hash: 'da0982184cc8fa54cf9d288a0fe1f6ca'
     * }
     *
     * // Using Vuex’s .dispatch method automatically exposes a context object
     * // as the dispatched action’s first argument.
     *
     * // Assuming “store” is our Vuex store, we can dispatch this action
     * // with the “data” object as its payload, deleting a synthdef with a
     * // hash matching “data.hash”:
     * store.dispatch('delete_synthdef', data)
     */
    synthdefs_actions.delete_synthdef = function ({commit}, payload) {
      commit('DELETE_SYNTHDEF', payload)
    }

export default synthdefs_actions

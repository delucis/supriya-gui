/** Actions for server_meters Vuex module. */
let server_meters_actions = {}

    /**
     * Commit a PATCH_SERVER_METERS mutation.
     *
     * @param {Object} $0 - context passed by the Vuex.dispatch() method.
     * @param {Object} $0.commit - the Vuex.commit() method
     * @param {Object} payload - object containing server meters object to update.
     */
    server_meters_actions.patch_server_meters = function ({commit}, payload) {
      commit('PATCH_SERVER_METERS', payload)
    }

export default server_meters_actions

/** Actions for server_status Vuex module. */
let server_status_actions = {}

    /**
     * Commits a {@link PATCH_SERVER_STATUS} mutation.
     *
     * @param {Object} $0 - context passed by the Vuex.dispatch() method.
     * @param {Object} $0.commit - the Vuex.commit() method
     * @param {Object} payload - object containing key-value pairs of status values to update, see {@link PATCH_SERVER_STATUS}
     */
    server_status_actions.patch_server_status = function ({commit}, payload) {
      commit('PATCH_SERVER_STATUS', payload)
    }

export default server_status_actions

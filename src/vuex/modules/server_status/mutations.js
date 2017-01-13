import Vue from 'vue'

/** Mutations for server_status Vuex module. */
let server_status_mutations = {}

    /**
     * Update some or all of the server status values.
     *
     * @param {Object} state - current state in store
     * @param {Object} payload - object containing key-value pairs of status values to update
     * @param {Number} [payload.actual_sample_rate] - The actual sample rate the server is currently running at.
     * @param {Number} [payload.average_cpu_usage] - The average CPU usage of the server.
     * @param {Number} [payload.group_count] - The number of groups in the server’s network.
     * @param {Number} [payload.peak_cpu_usage] - The highest CPU usage of the server.
     * @param {Number} [payload.synth_count] - The number of synths in the server’s network.
     * @param {Number} [payload.synthdef_count] - The number of synthdefs defined on the server.
     * @param {Number} [payload.target_sample_rate] - The sample rate the server is aiming to run at.
     * @param {Number} [payload.ugen_count] - The number of ugens (unit generators) in the server’s network.
     */
    server_status_mutations.PATCH_SERVER_STATUS = function (state, payload) {
      for (var property in payload) {
        if (payload.hasOwnProperty(property)
            && state.hasOwnProperty(property)
            && typeof payload[property] === typeof state[property])
        {
          Vue.set(state, property, payload[property])
        } else {
          console.error('PATCH_SERVER_STATUS(): Unknown server status property “' + property + '”.');
        }
      }
    }

export default server_status_mutations

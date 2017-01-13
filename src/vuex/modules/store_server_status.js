/**
 * Vuex store module for managing data about the current server status.
 * @module
 */

import Vue from 'vue'

let store_server_status = {}

store_server_status.state = {
    actual_sample_rate: 44100.,
    average_cpu_usage: 0,
    group_count: 0,
    peak_cpu_usage: 0,
    synth_count: 0,
    synthdef_count: 0,
    target_sample_rate: 44100.,
    ugen_count: 0
  }

/** Mutations for store_server_status Vuex module. */
store_server_status.mutations = {}

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
    store_server_status.mutations.PATCH_SERVER_STATUS = function (state, payload) {
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

/** Actions for store_server_status Vuex module. */
store_server_status.actions = {}

    /**
     * Commits a {@link PATCH_SERVER_STATUS} mutation.
     *
     * @param {Object} $0 - context passed by the Vuex.dispatch() method.
     * @param {Object} $0.commit - the Vuex.commit() method
     * @param {Object} payload - object containing key-value pairs of status values to update, see {@link PATCH_SERVER_STATUS}
     */
    store_server_status.actions.patch_server_status = function ({commit}, payload) {
      commit('PATCH_SERVER_STATUS', payload)
    }

export default store_server_status

/**
 * Vuex store module for managing audio metering state.
 * @module
 */

import Vue from 'vue'

let store_server_meters = {}

store_server_meters.state = {
    "input_meter_levels": [
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  }
    ],
    "output_meter_levels": [
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  }
    ]
  }

/** Mutations for store_server_meters Vuex module. */
store_server_meters.mutations = {}

    /**
     * Update blocks of server meters.
     *
     * @param {Object} state - current state in store
     * @param {Object} payload - server meters object to update
     * @param {Object[]} [payload.input_meter_levels] - array of peak & RMS values
     * @param {Number} [payload.input_meter_levels[].peak]
     * @param {Number} [payload.input_meter_levels[].rms]
     * @param {Object[]} [payload.output_meter_levels] - array of peak & RMS values
     * @param {Number} [payload.output_meter_levels[].peak]
     * @param {Number} [payload.output_meter_levels[].rms]
     */
    store_server_meters.mutations.PATCH_SERVER_METERS = function(state, payload) {
      for (var property in payload) {
        if (payload.hasOwnProperty(property)
            && state.hasOwnProperty(property)
            && typeof payload[property] === typeof state[property])
        {
          for (var i = 0; i < payload[property].length; i++) {
            Vue.set(state[property], i, payload[property][i])
          }
        } else {
          console.error('PATCH_SERVER_METERS(): Unknown server meters “' + property + '”.');
        }
      }
    }

/** Actions for store_server_meters Vuex module. */
store_server_meters.actions = {}

    /**
     * Commit a PATCH_SERVER_METERS mutation.
     *
     * @param {Object} $0 - context passed by the Vuex.dispatch() method.
     * @param {Object} $0.commit - the Vuex.commit() method
     * @param {Object} payload - object containing server meters object to update.
     */
    store_server_meters.actions.patch_server_meters = function ({commit}, payload) {
      commit('PATCH_SERVER_METERS', payload)
    }

export default store_server_meters

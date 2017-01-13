/**
 * Vuex store module for managing audio metering state.
 * @module
 */

import Vue from 'vue'

// create a Vuex store module to hold audio meters data from server
export default {
  state: {
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
  },
  mutations: {
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
    PATCH_SERVER_METERS (state, payload) {
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
  },
  actions: {
    patch_server_meters ({commit}, payload) {
      commit('PATCH_SERVER_METERS', payload)
    }
  }
}

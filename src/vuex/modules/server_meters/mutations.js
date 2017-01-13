import Vue from 'vue'

/** Mutations for server_meters Vuex module. */
let server_meters_mutations = {}

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
    server_meters_mutations.PATCH_SERVER_METERS = function(state, payload) {
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

export default server_meters_mutations

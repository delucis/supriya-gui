// create a Vuex store module to hold audio meters data from server
export default {
  state: {
    input_meter_peak_levels: [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
    input_meter_rms_levels: [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
    output_meter_peak_levels: [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
    output_meter_rms_levels: [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
  },
  mutations: {
    update_server_meters (state, payload) {
      for (var property in payload) {
        if (payload.hasOwnProperty(property)
            && state.hasOwnProperty(property)
            && typeof payload[property] === typeof state[property])
        {
          state[property] = payload[property]
        }
      }
    }
  }
}

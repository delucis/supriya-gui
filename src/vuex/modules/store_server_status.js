// create a Vuex store module to hold server status data
export default {
  state: {
    actual_sample_rate: 44100.,
    average_cpu_usage: 0,
    group_count: 0,
    peak_cpu_usage: 0,
    synth_count: 0,
    synthdef_count: 0,
    target_sample_rate: 44100.,
    ugen_count: 0
  },
  mutations: {
    update_server_status (state, payload) {
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

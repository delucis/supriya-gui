import Vue from 'vue'

// create a Vuex store module to hold audio meters data from server
export default {
  state: {
    "input_meter_levels": [
      { "peak": 0.031249552965164185, "rms": 0.010318668559193611 },
      { "peak": 0.031249552965164185, "rms": 0.010318668559193611 },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  }
    ],
    "output_meter_levels": [
      { "peak": 0.16099141538143158,  "rms": 0.04269769415259361  },
      { "peak": 0.1611536592245102,   "rms": 0.042732998728752136 },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  },
      { "peak": 0.0,                  "rms": 0.0                  }
    ]
  },
  mutations: {
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

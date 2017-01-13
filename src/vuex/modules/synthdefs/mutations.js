import Vue from 'vue'

/** Mutations for synthdefs Vuex module. */
let synthdefs_mutations = {}

    /**
     * Add a new synthdef to the store, and index it by its unique hash.
     *
     * @param {object} state - current state in store
     * @param {object} payload - a synthdef object to add to the store
     * @param {string} payload.hash - unique identifying hash
     * @param {string} payload.name - human-readable name
     * @param {object} payload.parameters - object containing definitions of the synthdef’s parameters
     */
    synthdefs_mutations.POST_SYNTHDEF = function (state, payload) {
      let synthdef = payload
      if (!synthdef.hasOwnProperty('hash')) {
        console.error('POST_SYNTHDEF(): synthdef payload does not contain a hash property.')
        return { status: 400 }
      }
      if (state.hasOwnProperty(synthdef.hash)) {
        console.error('POST_SYNTHDEF(): a synthdef with this hash already exists in the store.')
        return { status: 409 }
      }
      Vue.set(state, synthdef.hash, synthdef)
      return { status: 201, data: { url: '/synthdefs/' + synthdef.hash } }
    }

    /**
     * Update a synthdef in the store indexed by its unique hash.
     *
     * @param {object} state - current state in store
     * @param {object} payload - a synthdef object to update in the store
     * @param {string} payload.hash - unique identifying hash
     * @param {string} payload.name - human-readable name
     * @param {object} payload.parameters - object containing definitions of the synthdef’s parameters
     */
    synthdefs_mutations.PUT_SYNTHDEF = function (state, payload) {
      let synthdef = payload
      if (!synthdef.hasOwnProperty('hash')) {
        console.error('PUT_SYNTHDEF(): synthdef payload does not contain a hash property.')
        return { status: 404 }
      }
      if (!state.hasOwnProperty(synthdef.hash)) {
        console.error('PUT_SYNTHDEF(): a synthdef with this hash wasn’t found.')
        return { status: 404 }
      }
      Vue.set(state, synthdef.hash, synthdef)
      return { status: 200, data: { url: '/synthdefs/' + synthdef.hash } }
    }

    /**
     * Delete a synthdef in the store by its hash index.
     *
     * @param {object} state - current state in store
     * @param {string} payload - a synthdef hash
     */
    synthdefs_mutations.DELETE_SYNTHDEF = function (state, payload) {
      if (typeof payload !== 'string') {
        console.error('DELETE_SYNTHDEF(): payload must be a string.')
        return { status: 404 }
      }
      if (!state.hasOwnProperty(payload)) {
        console.error('DELETE_SYNTHDEF(): a synthdef with this hash does not exist.')
        return { status: 404 }
      }
      Vue.delete(state[payload])
      return { status: 200, data: null }
    }

export default synthdefs_mutations

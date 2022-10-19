const state = {
  vuex_muted: true
}

const mutations = {
  SET_VUEX_MUTED: state => {
    state.vuex_muted = !state.vuex_muted
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

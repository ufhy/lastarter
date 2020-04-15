import Vue from 'vue'
import _ from 'lodash/array'
import api from '../../utils/api'

export const state = {
  i18n: [],
};

export const getters =  {
  isLoaded: (state) => (payload) => {
    const find = _.findIndex(state.i18n, function(o) {
      return o === payload
    })

    if (find < 0) {
      return false
    } else {
      return true
    }
  }
}

export const mutations = {
  pushI18n (state, i18n) {
    state.i18n.push(i18n)
  },
};

export const actions = {
  async loadI18n({ commit, getters }, i18n) {
    const isLoaded = getters.isLoaded(i18n);
    if (!isLoaded) {
      try {
        const { data } = await api().get('/api/addons/i18n', {params: {module: i18n}});
        if (data) {
          Vue.i18n.add(ufhy.locale, data)
          commit('pushI18n', i18n)
        }
      } catch (e) {}
    }
  }
};
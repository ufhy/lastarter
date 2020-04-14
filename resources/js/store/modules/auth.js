import api from '../../utils/api'

export const state = {
    user: null,
}

export const getters = {
    user: state => state.user,
    isLogin: state => state.user !== null
}

export const mutations = {
    setUser(state, payload) {
        state.user = payload
    }
}

export const actions = {
    async fetchUser ({ commit }) {
        try {
            const { data } = await api().get('/api/user')
            commit('setUser', data)
        } catch (e) {
            commit('setUser', null)
        }
    },
    
    async logout ({ commit }) {
        try {
            await api().post('/api/auth/logout')
        } catch (e) {}

        commit('setUser', null)
    }
}
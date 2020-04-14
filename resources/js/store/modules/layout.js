export const state = {
    layout: null,
    defaultLayout: 'Default'
}

export const mutations = {
    setLayout(state, payload) {
        state.layout = payload ? payload : state.defaultLayout;
    }
}
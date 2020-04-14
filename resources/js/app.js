import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog'
import store from './store'
import router from './router'
import api from './utils/api'
import CoreSnackbars from './components/snackbars'
import VuejsConfirmDialog from './components/vuejsdialogs/VuejsConfirmDialog.vue'
import App from './components/App.vue'
import './components/core'

Vue.use(CoreSnackbars)

Vue.use(VuejsDialog)
Vue.dialog.registerComponent('vuejs-confirm-dialog', VuejsConfirmDialog)

Vue.prototype.$http = api()

import(/* webpackChunkName: "plugins" */ './plugins').then(() => {

    window.VUE = new Vue({
        el: '#root',
        vuetify,
        store,
        router,
        ...App,
    });

})
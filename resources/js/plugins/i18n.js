import Vue from 'vue'
import vuexI18n from 'vuex-i18n'
import store from '../store'

Vue.use(vuexI18n.plugin, store, {
  translateFilterName: 't'
});
Vue.i18n.add(ufhy.locale, ufhy.langs[ufhy.locale]);
Vue.i18n.set(ufhy.locale);
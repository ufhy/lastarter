import Vue from 'vue'
import CoreSnackbars from './CoreSnackbars.vue'

CoreSnackbars.install = (Vue, options) => {
	Vue.prototype.$coresnackbars = new (Vue.extend(CoreSnackbars))({
		propsData: options
	})
	Vue.coresnackbars = Vue.prototype.$coresnackbars
}

export default CoreSnackbars
<template>
    <div style="height:100vh" id="root">
        <transition name="page" mode="out-in">
            <component :is="layout" v-if="layout" />
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'

// Load layout components dynamically.
const requireContext = require.context('~/layouts', false, /.*\.vue$/)
const layouts = requireContext.keys()
    .map(file =>
        [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
    )
    .reduce((components, [name, component]) => {
        components[name] = component.default || component
        return components
    }, {})

export default {
    name: 'App',
    data() {
        return {
            layout: null,
            defaultLayout: 'Default'
        }
    },
    created() {
        this.$store.commit('auth/setUser', ufhy.userInfo)
    },
    methods: {
        /**
         * Set the application layout.
         *
         * @param {String} layout
         */
        setLayout (layout) {
            if (!layout || !layouts[layout]) {
                layout = this.defaultLayout
            }

            this.layout = layouts[layout]
        },
        /**
         * @param {String} message
         */
        confirmDelete(message) {
            const that = this
            
            return that.$dialog.confirm({
                body: message,
            }, {
                view: 'vuejs-confirm-dialog',
                animation: 'fade',
                backdropClose: true,
                mode: 'danger',
                customClass: 'v-application vuejs-confirm-dialog',
                okText: 'Yes, delete it!',
                cancelText: 'Cancel'
            })
        },
        /**
         * @param {String} message
         * @param {Object} options
         */
        confirm(message, options = {}) {
            console.log(options)
            return this.$dialog.confirm({
                body: message
            }, {
                title: 'Dicoba',
                view: 'vuejs-confirm-dialog',
                loader: options && options.loader ? options.loader : false,
                mode: options && options.mode ? options.mode : 'default',
                animation: 'fade',
                backdropClose: true,
                customClass: 'v-application vuejs-confirm-dialog',
                okText: options.okText ? options.okText : 'Confirm',
                cancelText: options.cancelText ? options.cancelText : 'Cancel',
            })
        },
    }
}
</script>
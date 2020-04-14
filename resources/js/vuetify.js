import Vue from 'vue'
import Vuetify, {
    VApp, VContent, VContainer, VAppBar, VToolbarTitle, VSystemBar,
    VBtn, VCheckbox, VTextField, VSelect, 
    VSpacer, VDivider, VIcon, VSnackbar, VAlert, VMenu, VSubheader,
    VRow, VCol,
    VDialog, VCard, VCardTitle, VCardText, VCardActions, 
    VList, VListItem, VListItemAction, VListItemTitle, VListItemSubtitle, VListItemContent, VListItemIcon,
    VDataTable,
} from 'vuetify/lib'
import '../styles/vuetify.scss'

Vue.use(Vuetify, {
    components: {
        VApp, VContent, VContainer, VAppBar, VToolbarTitle, VSystemBar,
        VBtn, VCheckbox, VTextField, VSelect, 
        VSpacer, VDivider, VIcon, VSnackbar, VAlert, VMenu, VSubheader,
        VRow, VCol,
        VDialog, VCard, VCardTitle, VCardText, VCardActions, 
        VList, VListItem, VListItemAction, VListItemTitle, VListItemSubtitle, VListItemContent, VListItemIcon,
        VDataTable,
    }
})

window.vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#448AFF'
            }
        }
    },
    icons: {
        iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
})

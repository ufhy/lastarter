<template>
    <core-form-dialog
        :open.sync="show"
        :loading="form.busy"
        :title="title"
        :close-router="{name: 'user.permissions.index'}"
        :btn-save="mode !== 'edit'"
        @save-close="saveAction('saveClose')"
        @save="saveAction">
        <v-text-field
            :label="$t('words.lb_name')"
            v-model="form.name"
            :error-messages="form.errors.getAll('name')"
        />
    </core-form-dialog>
</template>

<script>
import { Form } from '../../utils/vform'
export default {
    name: 'PermissionFormPage',
    data() {
        return {
            show: false,
            itemId: '',
            form: new Form({
                name: '',
                guard_name: '',
            })
        }
    },
    computed: {
        mode() {
            return this.itemId ? 'edit' : 'new'
        },
        title() {
            return this.mode === 'new' 
                ? this.$t('user.permissions.heading_create')
                : this.$t('user.permissions.heading_edit')
        }
    },
    async created() {
        this.itemId = this.$route.params.id ? this.$route.params.id : ''

        this.form.busy = true
        this.mode === 'edit' && await this.fetchRow()
        this.form.busy = false
    },
    mounted() {
        this.show = true
    },
    methods: {
        closeAction(refresh = false) {
            this.show = false
            this.$router.push({
                name: 'user.permissions.index',
                params: {refresh: refresh}
            })
        },
        fetchRow() {
            return this.$http.get('/api/user/permissions/' + this.itemId).then(response => {
                const { data } = response
                this.form.name = data.name
                this.form.guard_name = data.guard_name
            }).catch(err => {
                this.$root.httpError(err)
            })
        },
        async saveAction(payload) {
            if (this.form.busy) {
                return false
            }

            this.form.clear()
            try {
                let response = this.mode === 'new'
                    ? await this.form.post('/api/user/permissions')
                    : await this.form.put('/api/user/permissions/' + this.itemId)
                const { data } = response
                this.$coresnackbars.success(data.message)

                payload === 'saveClose'
                    ? this.closeAction(true)
                    : this.form.reset()
            } catch (error) {
                this.$root.httpError(error)
            }
        }
    }
}
</script>
<template>
    <core-form-dialog
        :open.sync="show"
        :loading="form.busy"
        :title="title"
        :close-router="{name: 'user.roles.index'}"
        :btn-save="mode !== 'edit'"
        @save-close="saveAction('saveClose')"
        @save="saveAction">
        <v-text-field
            :label="$t('words.lb_name')"
            v-model="form.name"
            :error-messages="form.errors.getAll('name')"
        />
        <v-select 
            multiple small-chips deletable-chips clearable all
            label="Permissions"
            item-text="name"
            item-value="id"
            v-model="form.permissions"
            :error-messages="form.errors.getAll('permissions')"
            :items="permissionOptions">
            <template v-slot:prepend-item>
                <v-list-item ripple dense
                    @click="permissionSelectAll">
                    <v-list-item-action>
                        <v-icon :color="form.permissions.length > 0 ? 'primary darken-2' : ''">
                            {{ iconSelect }}
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ $t('words.lb_select_all') }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
            </template>
        </v-select>
    </core-form-dialog>
</template>

<script>
import { Form } from '../../utils/vform'
export default {
    name: 'RoleFormPage',
    data() {
        return {
            show: false,
            itemId: '',
            form: new Form({
                name: '',
                guard_name: '',
                permissions: []
            }),
            permissionOptions: []
        }
    },
    computed: {
        mode() {
            return this.itemId ? 'edit' : 'new'
        },
        title() {
            return this.mode === 'new' 
                ? this.$t('user.roles.heading_create')
                : this.$t('user.roles.heading_edit')
        },
        isAllPermission() {
            return this.form.permissions.length === this.permissionOptions.length
        },
        isSomePermission() {
            return this.form.permissions.length > 0 && !this.isAllPermission
        },
        iconSelect () {
            if (this.isAllPermission) return 'check_box'
            if (this.isSomePermission) return 'indeterminate_check_box'
            return 'check_box_outline_blank'
        },

    },
    async created() {
        this.itemId = this.$route.params.id ? this.$route.params.id : ''

        this.form.busy = true
        this.fetchOptions()
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
                name: 'user.roles.index',
                params: {refresh: refresh}
            })
        },
        fetchOptions() {
            this.$http.get('/api/user/roles/form-options').then(response => {
                const { data } = response
                this.permissionOptions = data.permissions
            }).catch(err => {
                this.$coresnackbars.error(this.$t('messages.error_init_date'))
            })
        },
        fetchRow() {
            return this.$http.get('/api/user/roles/' + this.itemId).then(response => {
                const { data } = response
                this.form.name = data.name
                this.form.guard_name = data.guard_name
                this.form.permissions = []
                if (data.permissions) {
                    const that = this
                    data.permissions.forEach(permission => {
                        that.form.permissions.push(permission.id)
                    });
                }
            }).catch(err => {
                this.$coresnackbars.error(this.$t('messages.error_init_date'))
            })
        },
        async saveAction(payload) {
            if (this.form.busy) {
                return false
            }

            this.form.clear()
            try {
                let response = this.mode === 'new'
                    ? await this.form.post('/api/user/roles')
                    : await this.form.put('/api/user/roles/' + this.itemId)
                const { data } = response
                this.$coresnackbars.success(data.message)

                payload === 'saveClose'
                    ? this.closeAction(true)
                    : this.form.reset()
            } catch (error) {
                const { data } = error
                if (data.message) {
                    this.$coresnackbars.error(data.message)
                }
            }
        },
        permissionSelectAll() {
            this.$nextTick(() => {
                if (this.isAllPermission) {
                    this.form.permissions = []
                } else {
                    this.form.permissions = this.permissionOptions
                }
            })
        }
    }
}
</script>
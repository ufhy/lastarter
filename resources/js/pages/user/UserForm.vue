<template>
    <core-form-dialog
        :open.sync="show"
        :loading="form.busy"
        :title="title"
        :close-router="{name: 'user.users.index'}"
        :btn-save="mode !== 'edit'"
        @save-close="saveAction('saveClose')"
        @save="saveAction">
        <v-checkbox 
            color="primary"
            label="Active"
            v-model="form.active"
        />
        <v-text-field
            label="Username"
            prepend-icon="account_circle"
            v-model="form.username"
            :error-messages="form.errors.getAll('username')"
        />
        <v-select 
            multiple small-chips deletable-chips clearable 
            label="Roles"
            prepend-icon="supervised_user_circle"
            item-text="name"
            item-value="id"
            v-model="form.roles"
            :error-messages="form.errors.getAll('roles')"
            :items="roleOptions"
        />
        <v-text-field 
            label="Email"
            prepend-icon="mail_outline"
            v-model="form.email"
            :error-messages="form.errors.getAll('email')"
        />

        <div v-if="mode === 'edit'" class="d-flex">
            <v-spacer />
            <v-checkbox 
                hide-details
                label="Change password"
                v-model="form.change_password"
            />
        </div>
        <template v-if="(mode === 'edit' && form.change_password) || (mode === 'new')">
            <v-text-field 
                label="Password"
                type="password"
                prepend-icon="lock_open"
                v-model="form.password"
                :error-messages="form.errors.getAll('password')"
            />
            <v-text-field 
                label="Password confirmation"
                type="password"
                prepend-icon=" "
                v-model="form.password_confirmation"
                :error-messages="form.errors.getAll('password_confirmation')"
            />
        </template>
    </core-form-dialog>
</template>

<script>
import { Form } from '../../utils/vform'
export default {
    name: 'UserForm',
    data() {
        return {
            show: false,
            itemId: '',
            form: new Form({
                username: '',
                email: '',
                active: true,
                change_password: false,
                password: '',
                password_confirmation: '',
                roles: []
            }),
            roleOptions: []
        }
    },
    computed: {
        mode() {
            return this.itemId ? 'edit' : 'new'
        },
        title() {
            return this.mode === 'new' 
                ? 'Create user'
                : 'Edit user'
        }
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
                name: 'user.users.index',
                params: {refresh: refresh}
            })
        },
        fetchOptions() {
            this.$http.get('/api/user/users/form-options').then(response => {
                const { data } = response
                this.roleOptions = data.roles
            }).catch(err => {
                this.$coresnackbars.error('Error when initial data')
            })
        },
        fetchRow() {
            return this.$http.get('/api/user/users/' + this.itemId).then(response => {
                const { data } = response
                this.form.username = data.username
                this.form.email = data.email
                this.form.active = data.active
                this.form.roles = data.roles
            })
        },
        async saveAction(payload) {
            if (this.form.busy) {
                return false
            }

            this.form.clear()
            try {
                let response = this.mode === 'new'
                    ? await this.form.post('/api/user/users')
                    : await this.form.put('/api/user/users/' + this.itemId)
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
        }
    }
}
</script>
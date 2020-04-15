<template>
    <v-dialog
        scrollable persistent
        transition="slide-y-transition"
        v-model="show"
        max-width="400">
        <v-card :loading="loading" :disabled="loading">
            <v-card-title>
                <span>{{ $t('user.users.heading_detail') }}</span>
                <v-spacer />
                <v-btn icon exact
                    :to="{
                        name: 'user.users.edit',
                        params: {id: itemId}
                    }">
                    <v-icon>edit</v-icon>
                </v-btn> 
                <v-btn icon exact
                    :to="{name: 'user.users.index'}">
                    <v-icon>close</v-icon>
                </v-btn> 
            </v-card-title>
            <v-card-text class="pa-0">
                <v-list>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>account_circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                {{ username }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ $t('words.lb_username') }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mail_outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                {{ email }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ $t('words.lb_email') }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider inset />
                    <v-list-item>
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                {{ active ? 'Active' : 'Disabled' }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ $t('words.lb_status') }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon />
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                {{ lastLogin ? $moment(lastLogin).format('MMM DD, YYYY') : 'Not yet' }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ $t('words.lb_last_login') }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { Form } from '../../utils/vform'
export default {
    name: 'UserViev',
    data() {
        return {
            show: false,
            loading: false,
            itemId: '',
            username: '',
            email: '',
            active: '',
            lastLogin: ''
        }
    },
    async created() {
        this.itemId = this.$route.params.id ? this.$route.params.id : ''

        this.loading = true
        await this.fetchRow()
        this.loading = false
    },
    mounted() {
        this.show = true
    },
    methods: {
        fetchRow() {
            return this.$http.get('/api/user/users/' + this.itemId).then(response => {
                const { data } = response
                this.username = data.username
                this.email = data.email
                this.active = data.active
                this.lastLogin = data.last_login
            }).catch(err => {
                this.$coresnackbars.error(this.$t('messages.error_init_date'))
            })
        },
    }
}
</script>
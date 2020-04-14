<template>
    <v-container class="pt-5 mt-5">
        <v-row no-gutters justify="center" align="start">
            <v-col cols="12" lg="8">
                <v-card outlined>
                    <v-card-title>
                        Profile
                    </v-card-title>
                    <v-list two-line class="v-list--information">
                        <v-list-item link>
                            <v-list-item-content>
                                <v-list-item-action>
                                    Username
                                </v-list-item-action>
                                <v-list-item-title>
                                    <span>{{ user.username }}</span>
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-icon>chevron_right</v-icon>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider />
                        <v-list-item link>
                            <v-list-item-content>
                                <v-list-item-action>
                                    Email
                                </v-list-item-action>
                                <v-list-item-title>
                                    {{ user.email }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-icon>chevron_right</v-icon>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider />
                        <v-list-item link>
                            <v-list-item-content>
                                <v-list-item-action>
                                    Last login
                                </v-list-item-action>
                                <v-list-item-title>
                                    {{ $moment(user.last_login).format('MMMM DD, YYYY') }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider />
                        <v-list-item link>
                            <v-list-item-content>
                                <v-list-item-action>
                                    Created At
                                </v-list-item-action>
                                <v-list-item-title>
                                    {{ $moment(user.created_at).format('MMMM DD, YYYY') }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'ProfilePage',
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    }
}
</script>